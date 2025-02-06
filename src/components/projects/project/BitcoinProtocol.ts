// Importing interfaces and image
import { FullProject } from '../projectInterfaces'
import img from '../../../assets/bitcoin_protocol.png'
import gif from "../../../assets/bitcoinProtocol.gif"
// Example implementation
const bitcoinProtocol: FullProject = {
    title: 'Bitcoin Stablecoin Protocol',
    shortDescription: 'A DApp for a bitcoin-backed stablecoin.',
    description: 'A stablecoin protocol liquidation bonuses and much more.',
    date: {
        started: '2024-12-17',
        completed: '2025-02-02',
        lastUpdated: '2025-02-02'
    },
    status: 'in-progress',
    featured: true,
    techStack: {
        languages: ["Typescript", "Solidity"],
        frameworks: ["React", "Foundry", "Ethers.js"],
        tools: ["Git", "npm", "Vercel"],
        deployedTo: ['Ethereum Sepolia']
    },
    images: {
        thumbnail: img,
        preview: gif,
        screenshots: [
            // Add relevant screenshots showing different features
        ]
    },
    links: [
        {
            type: 'live',
            url: 'https://stablecoin-protocol.vercel.app/',
            label: 'Live Demo'
        },
        {
            type: 'github',
            url: 'https://github.com/trev-sykes/Stablecoin-Protocol',
            label: 'Source Code'
        }
    ],
    features: [
        'Auto-deposits synthetic BTC for easy testing',
        'Chainlink pricefeeds for accurate pricing and Health monitoring',
        'On-chain health factor monitoring',
        'Liquidations and bonuses for liquidating users with bad health',
        'Native React and Vanilla CSS design using Flex-box design'
    ],
    challenges: [
        {
            description: 'Separating user state from protocol state, some requires a signer others require a provider.',
            solution: `Moularized hooks, separation of concerns from read-only state updates from write updates.`
        },
        {
            description: 'App wide updates when user interacts with children components that require the parent to update.',
            solution: 'Globalized hooks to the App, then pass it down to children with handlers remaining inside of App component. Will implement useContext in next stage.'
        },
        {
            description: 'Keeping private data private when deploying to vercel.',
            solution: 'Implemented dot.env and added private data to vercel app.'
        }
    ],
    dependencies: [
        {
            name: 'ReCharts',
            version: '^2.8.0',
            description: 'A React library for creating interactive and dynamic charts',
            purpose: 'To render bitcoin price on a chart.'
        },
        {
            name: 'Material UI',
            version: '^5.0.0',
            description: 'React component library based on Material Design',
            purpose: 'For consistency in card designs and page layouts.'
        }
    ],
    summary: `Bitcoin stablecoin protocol is DApp with typical deposit, minting, liquidating functionality.
    With on-chain health factor monitoring, users can easily track their collateralization ratio and health and liqudate users who fall under the min health factor with a 10% liquidation bonus. You can ensure liquidity in the protocol due to the 150% overcollateralization requirement.
    Users can track the on-chain price of their collateral(wrapped Bitcoin) on a chart.`,
    inspiration: `The inspiration behind this protocol was from the Cyfrin Avanced Foundry Course, where Patrick Collins implements a similar smart contract protocol. This led me to create my own version of the protocol with my own refinements and a front end for users to easily interact with the protocol.
    I wanted to expand my knowlege of DeFi architectures and blockchain integration with front end systems. 
    This project allowed me to understand the workings behind an algorithmic, pegged stablecoin whose logic is 100% on-chain.
    Ultimately, my goal was to create a protocol that would help others better understand the advantages and possibilities that blockchain technology can have on Traditional Finance, leading people closer to a Web3 reality.`,
    codeBlocks: [
        {
            language: 'solidity',
            fileName: 'BitcoinDollarEngine.ts',
            content: `    function liquidate(address user) public nonReentrant {
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
    }`,
            description: 'Main function that handles liquidations in the protocol.'
        }
    ],
    learnings: [
        'Deepened understanding of DeFi architecture',
        'Improved skills in real-time data visualization',
        'Gained experience with Ethers.js and interacting with blockchiain',
        'Enhanced understanding of state management patterns'
    ],
    futureImprovements: [
        'Mobile responsivness',
        'Touch up the UI',
        'Include better instructions for people new to crypto',
        'Create educational tutorials and documentation'
    ]
};

export default bitcoinProtocol;