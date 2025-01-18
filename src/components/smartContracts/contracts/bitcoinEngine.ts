const bitcoinEngine = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SyntheticBitcoin} from "./SyntheticBitcoin.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {BitcoinDollar} from "./BitcoinDollar.sol";

/**
 * @title Bitcoin Dollar Engine
 * @author Trev December 8th, 2024
 * @notice This contract powers the Bitcoin Dollar (BTCD) stablecoin system, an algorithmically-stabilized, Bitcoin-backed currency.
 * @notice It allows for overcollateralized lending, where users can deposit Bitcoin as collateral to mint BTCD tokens.
 * @notice The system ensures that BTCD is pegged 1:1 to USD through an exogenous collateral model, with minting and burning of tokens based on collateralization ratios.
 * @notice When a user’s collateralization ratio falls below a threshold, liquidation mechanisms can be triggered to maintain system stability.
 * @dev The Bitcoin Dollar Engine integrates both the minting of BTCD tokens and the management of collateral to maintain the peg.
 * @dev The contract features an algorithmic approach to stability, where tokens are minted or burned in response to market conditions, ensuring that the supply is always aligned with demand and collateralization.
 * @custom:security-contact security@bitcoindollar.com
 */
contract BitcoinDollarEngine is ReentrancyGuard {
    struct CurrentState {
        uint256 wBtcPrice;
        uint256 totalCollateralDeposited;
        uint256 totalDebt;
        uint256 collateralizationRatio;
    }

    struct LiquidationParams {
        uint256 liquidationThreshold;
        uint256 liquidationBonus;
        uint256 maxLiquidationRatio;
        uint256 minHealthFactor;
    }

    struct UserState {
        uint256 sBtcOwned;
        uint256 collateralDeposited;
        uint256 collateralValueInUsd;
        uint256 btcDollarMinted;
        uint256 collateralizationRatio;
        uint256 healthFactor;
    }

    /**
     * -- Constants--
     */
    uint256 private constant LIQUIDATION_THRESHOLD = 150; // 150% collateralization required
    uint256 private constant LIQUIDATION_BONUS = 10; // 10% bonus for liquidators
    uint256 private constant PERCENTAGE_PRECISION = 100;
    uint256 private constant PRECISION = 1e18;
    uint256 private constant MIN_HEALTH_FACTOR = 1e18; // 1.0
    uint256 private constant ADDITIONAL_FEED_PRECISION = 1e10;
    uint256 private constant MAX_LIQUIDATION_RATIO = 50; // Can liquidate up to 50% of a position

    /**
     * -- State Variables --
     */
    SyntheticBitcoin private immutable i_sBtc;
    AggregatorV3Interface private immutable i_btcPriceFeed;
    BitcoinDollar private immutable i_btcDollar;

    /**
     * -- User State --
     */
    mapping(address user => uint256 amount) private s_collateralDeposited;
    mapping(address user => uint256 amount) private s_bitcoinDollarMinted;

    /**
     * -- Events --
     */
    event CollateralDeposited(address indexed user, uint256 amount);
    event CollateralRedeemed(address indexed user, uint256 amount);
    event BitcoinDollarMinted(address indexed user, uint256 amount);
    event BitcoinDollarBurned(address indexed user, uint256 amount);
    event Liquidated(
        address indexed user,
        address indexed liquidator,
        uint256 debtRepaid,
        uint256 collateralSeized,
        uint256 liquidationBonus
    );
    event AdditionalSBtcMintedToCoverInsufficientBalance(address indexed user, uint256 amountToMint);

    /**
     * -- Cutsom Errors --
     */
    error BitcoinDollarEngine__NeedsMoreThanZero();
    error BitcoinDollarEngine__TransferFailed();
    error BitcoinDollarEngine__HealthFactorTooLow();
    error BitcoinDollarEngine__MintFailed();
    error BitcoinDollarEngine__PositionNotLiquidatable();
    error BitcoinDollarEngine__InvalidAmount();
    error BitcoinDollarEngine__MustBurnYourDebtBeforeRedeemingCollateral(uint256 debtToBurn);
    error BitcoinDollar__OperationBreaksHealthFactor();

    /**
     * @notice Restricts calls to amounts greater than zero
     * @param amount Needs more than zero
     */
    modifier moreThanZero(uint256 amount) {
        require(amount > 0, BitcoinDollarEngine__NeedsMoreThanZero());
        _;
    }
    /**
     * @notice initializes immutable variables
     * @param sbtcAddress Address of erc20 token
     * @param bitcoinDollarAddress Address of chainlinks price feed for wBtc/USD
     * @param btcPriceFeed price feed address
     */

    constructor(address sbtcAddress, address bitcoinDollarAddress, address btcPriceFeed) {
        i_sBtc = SyntheticBitcoin(sbtcAddress);
        i_btcPriceFeed = AggregatorV3Interface(btcPriceFeed);
        i_btcDollar = BitcoinDollar(bitcoinDollarAddress);
    }
    /**
     * @notice Function to deposit collateral and mint in one call
     * @param collateralAmount Amount of collateral to deposit
     * @param mintAmount  Amount of coin to mint
     */

    function depositCollateralAndMintBitcoinDollar(uint256 collateralAmount, uint256 mintAmount) external {
        depositCollateral(collateralAmount);
        mintBitcoinDollar(mintAmount);
    }

    /**
     * @notice Function to burn and redeem in one call
     * @param collateralAmount Amount of collateral to redeem
     * @param burnAmount Amount of dollars to Burn
     */
    function burnBitcoinDollarAndRedeemCollateral(uint256 collateralAmount, uint256 burnAmount) external {
        burnBitcoinDollar(burnAmount);
        redeemCollateral(collateralAmount);
    }

    function _calculateHealthFactor(uint256 debt, uint256 collateralValueInUsd) internal pure returns (uint256 healthFactor) {
        if (debt == 0) return type(uint256).max;
        uint256 collateralAdjustedForThreshold = (collateralValueInUsd * PERCENTAGE_PRECISION) / LIQUIDATION_THRESHOLD;
        healthFactor = (collateralAdjustedForThreshold * PRECISION) / debt;
    }

    function getLiquidationParams() external pure returns (LiquidationParams memory) {
        LiquidationParams memory params = LiquidationParams({
            liquidationThreshold: LIQUIDATION_THRESHOLD,
            liquidationBonus: LIQUIDATION_BONUS,
            maxLiquidationRatio: MAX_LIQUIDATION_RATIO,
            minHealthFactor: MIN_HEALTH_FACTOR
        });
        return params;
    }

    function getCollateralRequirementForDebt(uint256 debt) external pure moreThanZero(debt) returns (uint256 collateralRequirement){
        collateralRequirement = (debt * LIQUIDATION_THRESHOLD) / PERCENTAGE_PRECISION;
    }

    /**
     * @notice Deposit collateral
     * @param amount Amount of collateral to deposit
     */
    function depositCollateral(uint256 amount) public moreThanZero(amount) {
        uint256 usersBalance = i_sBtc.balanceOf(msg.sender);
        if (usersBalance < amount) {
            uint256 amountToMint = amount - usersBalance;
            i_sBtc.mint(msg.sender, amountToMint);
            emit AdditionalSBtcMintedToCoverInsufficientBalance(msg.sender, amountToMint);
        }
        s_collateralDeposited[msg.sender] += amount;
        emit CollateralDeposited(msg.sender, amount);
        bool success = i_sBtc.transferFrom(msg.sender, address(this), amount);
        require(success, BitcoinDollarEngine__TransferFailed());
    }
    /**
     * @notice Mint dollars
     * @param amount Amount of dollars to mint
     */

    function mintBitcoinDollar(uint256 amount) public moreThanZero(amount) {
        s_bitcoinDollarMinted[msg.sender] += amount;

        bool success = i_btcDollar.mint(msg.sender, amount);
        require(success, BitcoinDollarEngine__MintFailed());

        uint256 healthFactor = getHealthFactor(msg.sender);
        require(healthFactor > MIN_HEALTH_FACTOR, BitcoinDollarEngine__HealthFactorTooLow());
        emit BitcoinDollarMinted(msg.sender, amount);
    }
    /**
     * @notice Liquidates a user's position if their health factor is below the minimum threshold.
     *         The liquidator receives a bonus for repaying part of the user's debt and seizing collateral.
     *
     * @dev checks if the user's health factor qualifies for liquidation, then calculates
     *      the maximum amount of debt to be repaid and the corresponding collateral to be seized,
     *      including the liquidation bonus. The collateral is redeemed and the debt is burned.
     *
     * @param user The address of the user whose position is being liquidated.
     *
     *
     * @custom:security non-reentrant Prevents re-entrancy attacks.
     */

    function liquidate(address user) public nonReentrant {
        // Check if position is liquidatable
        uint256 healthFactor = getHealthFactor(user);
        require(healthFactor <= MIN_HEALTH_FACTOR, BitcoinDollarEngine__PositionNotLiquidatable());

        // Get user's debt and collateral
        UserState memory state = getUserInformation(user);

        // Calculate maximum liquidation amount (50% of debt)
        uint256 maxLiquidation = (state.btcDollarMinted * MAX_LIQUIDATION_RATIO) / PERCENTAGE_PRECISION;

        // Calculate collateral to seize including bonus
        uint256 collateralToSeize = (maxLiquidation * (PERCENTAGE_PRECISION + LIQUIDATION_BONUS)) / PERCENTAGE_PRECISION;
        // Convert USD value to WBTC amount
        (, int256 price,,,) = i_btcPriceFeed.latestRoundData();
        uint256 wbtcToSeize = ((collateralToSeize * PRECISION) / uint256(price)) / ADDITIONAL_FEED_PRECISION;
        _redeemCollateral(wbtcToSeize, user, msg.sender);
        _burnBitcoinDollar(maxLiquidation, user, msg.sender);

        emit Liquidated({
            user: user,
            liquidator: msg.sender,
            debtRepaid: maxLiquidation,
            collateralSeized: wbtcToSeize,
            liquidationBonus: collateralToSeize - maxLiquidation
        });
    }
    /**
     * @notice Function to redeem collateral.
     * @notice Must Burn Dollars before redeeming.
     * @param amount Amount to buy
     * @dev Might allow for other's to redeem on users behalf during liquidation?
     */

    function redeemCollateral(uint256 amount) public moreThanZero(amount) {
        _redeemCollateral(amount, msg.sender, msg.sender);
        _revertOnBadHealth(msg.sender);
        emit CollateralRedeemed(msg.sender, amount);
    }
    /**
     * @notice Function to burn Dollars
     * @param amount Amount of dollars to burn
     */

    function _burnBitcoinDollar(uint256 amount, address onBehalfOf, address bitcoinDollarFrom) private {
        s_bitcoinDollarMinted[onBehalfOf] -= amount;
        bool success = i_sBtc.transferFrom(bitcoinDollarFrom, address(this), amount);
        require(success, BitcoinDollarEngine__TransferFailed());
        i_sBtc.burn(amount);
    }

    function burnBitcoinDollar(uint256 amount) public moreThanZero(amount) {
        _burnBitcoinDollar(amount, msg.sender, msg.sender);
        _revertOnBadHealth(msg.sender);
        emit BitcoinDollarBurned(msg.sender, amount);
    }

    /**
     * -- View Functions--
     */
    function getHealthFactor(address user) public view returns (uint256) {
        UserState memory state = getUserInformation(user);
        return _calculateHealthFactor(state.btcDollarMinted, state.collateralValueInUsd);
    }

    function getHealthFactorAfterCollateralChange(address user, uint256 newCollateralAmount) external view moreThanZero(newCollateralAmount) returns (uint256) {
        uint256 newCollateralValueInUsd = getUsdValue(newCollateralAmount);
        uint256 debt = s_bitcoinDollarMinted[user];
        return _calculateHealthFactor(debt, newCollateralValueInUsd);
    }

    function getTotalSystemDebt() public view returns (uint256) {
        return i_btcDollar.totalSupply();
    }

    function getCurrentState() public view returns (CurrentState memory) {
        uint256 wBtcPrice = getCurrentWBTCPrice();
        uint256 totalCollateralDeposited = getTotalCollateralDeposited();
        uint256 totalDebt = getTotalSystemDebt();
        uint256 collateralizationRatio = getSystemCollateralizationRatio();
        CurrentState memory state = CurrentState({
            wBtcPrice: wBtcPrice,
            totalCollateralDeposited: totalCollateralDeposited,
            totalDebt: totalDebt,
            collateralizationRatio: collateralizationRatio
        });
        return state;
    }

    function canLiquidate(address user) public view returns (bool) {
        uint256 userHealth = getHealthFactor(user);
        return userHealth <= MIN_HEALTH_FACTOR;
    }

    function getUsdValue(uint256 amount) public view returns (uint256 scaledPrice) {
        (, int256 price,,,) = i_btcPriceFeed.latestRoundData();
        scaledPrice = (uint256(price) * ADDITIONAL_FEED_PRECISION * amount) / PRECISION;
    }

    function getCurrentWBTCPrice() public view returns (uint256) {
        (, int256 price,,,) = i_btcPriceFeed.latestRoundData();
        return uint256(price);
    }

    function getSystemContractAddresses() public view returns (address sBtcAddress, address btcPriceFeedAddress, address btcDollarAddress) {
        (sBtcAddress, btcPriceFeedAddress, btcDollarAddress) =
            (address(i_sBtc), address(i_btcPriceFeed), address(i_btcDollar));
    }

    function getUserInformation(address user) public view returns (UserState memory) {
        uint256 sBtcOwned = i_sBtc.balanceOf(user);
        uint256 collateralDeposited = s_collateralDeposited[user];
        uint256 collateralValueUSD = getUsdValue(collateralDeposited);
        uint256 btcDollarMinted = s_bitcoinDollarMinted[user];
        uint256 collateralizationRatio = getUserCollateralizationRatio(user);
        uint256 healthFactor = getHealthFactor(user);
        UserState memory userState = UserState({
            sBtcOwned: sBtcOwned,
            collateralDeposited: collateralDeposited,
            collateralValueInUsd: btcDollarMinted,
            btcDollarMinted: btcDollarMinted,
            collateralizationRatio: collateralizationRatio,
            healthFactor: healthFactor
        });
        return userState;
    }

    function getTotalCollateralDeposited() public view returns (uint256) {
        return i_sBtc.balanceOf(address(this));
    }

    function getSystemCollateralizationRatio() public view returns (uint256 collateralizationRatio) {
        uint256 totalCollateralValueInUsd = getUsdValue(getTotalCollateralDeposited());
        uint256 totalDebt = getTotalSystemDebt();
        if (totalDebt == 0) return type(uint256).max;
        collateralizationRatio = (totalCollateralValueInUsd * PRECISION) / totalDebt;
    }

    function getUserCollateralizationRatio(address user) public view returns (uint256 collateralizationRatio) {
        UserState memory state = getUserInformation(user);
        if (state.btcDollarMinted == 0) return type(uint256).max;
        collateralizationRatio = (state.collateralValueInUsd * PRECISION) / state.btcDollarMinted;
    }

    function getUserDebtShare(address user) public view returns (uint256 userDebtShare) {
        uint256 userDebt = s_bitcoinDollarMinted[user];
        uint256 totalDebt = getTotalSystemDebt();
        if (totalDebt == 0) return 0;
        userDebtShare = (userDebt * PRECISION) / totalDebt;
    }

    function getMaxMintableAmount(address user) public view returns (uint256 maxMintableAmount) {
        uint256 collateralValueInUsd = getUsdValue(s_collateralDeposited[user]);
        uint256 maxMintable = (collateralValueInUsd * PERCENTAGE_PRECISION) / LIQUIDATION_THRESHOLD;
        uint256 currentDebt = s_bitcoinDollarMinted[user];
        if (currentDebt >= maxMintable) return 0;
        maxMintableAmount = maxMintable - currentDebt;
    }

    function _redeemCollateral(uint256 amount, address from, address to) private {
        uint256 userBalance = s_collateralDeposited[from];
        require(userBalance >= amount, BitcoinDollarEngine__InvalidAmount());
        s_collateralDeposited[from] -= amount;
        bool success = i_sBtc.transfer(to, amount);
        require(success, BitcoinDollarEngine__TransferFailed());
    }

    function _revertOnBadHealth(address user) private view {
        UserState memory state = getUserInformation(user);
        uint256 health = _calculateHealthFactor(state.btcDollarMinted, state.collateralValueInUsd);
        require(health > MIN_HEALTH_FACTOR, BitcoinDollar__OperationBreaksHealthFactor());
    }
}
`
export default bitcoinEngine;