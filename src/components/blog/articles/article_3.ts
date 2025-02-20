import img from '../../../assets/article_3.jpeg'
import { BlogPreview, FullArticle } from '../articleInterfaces';

const blogPreview: BlogPreview = {
    previewTitle: 'Building a Lottery DApp',
    description: `A straightforward guide to building a decentralized lottery application using smart contracts, covering core components and implementation essentials.`,
    date: 'February 7, 2024',
    topic: ['Smart Contracts', 'DApp', 'Solidity', 'Web3', 'Tutorial'],
    imageUrl: img
};
const fullArticle: FullArticle = {
    ...blogPreview,
    title: 'Building a Lottery DApp: A Technical Overview',
    sections: [
        {
            sectionTitle: 'Project Overview',
            content: [`A decentralized lottery consists of three core components:`,
                `1. Smart Contract: Handles ticket purchases, random number generation, and prize distribution
                 2. Front-end Interface: Allows users to interact with the contract
                 3. Web3 Integration: Connects the front-end to the blockchain`,
                `The key feature is transparency - all lottery operations are verifiable on-chain, with random number generation handled through secure mechanisms like Chainlink VRF (Verifiable Random Function).`]
        },
        {
            sectionTitle: 'Smart Contract Architecture',
            content: [`The lottery smart contract requires these essential functions:`,
                `1. Ticket Purchase
                 2. Winner Selection
                 3. Random Number Generation (using Chainlink VRF)`,
                `Key considerations:`,
                `- Secure random number generation
                - Gas-efficient ticket storage
                - Automated prize distribution
            - Emergency pause functionality`],
            codeBlocks: [
                {
                    language: 'solidity',
                    code: `function buyTicket() external payable {
    require(msg.value == ticketPrice, "Incorrect ticket price");
    tickets[msg.sender].push(currentLotteryId);
    emit TicketPurchased(msg.sender, currentLotteryId);
}`
                },
                {
                    language: 'solidity',
                    code: `function selectWinner(uint256 randomNumber) internal {
    uint256 winningTicket = randomNumber % totalTickets;
    address winner = ticketToParticipant[winningTicket];
    payable(winner).transfer(prizePool);
}`
                },
                {
                    language: 'solidity',
                    code: `function requestRandomNumber() internal {
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
    requestId = COORDINATOR.requestRandomWords(
        keyHash,
        subscriptionId,
        requestConfirmations,
        callbackGasLimit,
        numWords
    );
}`
                }
            ]
        },
        {
            sectionTitle: 'Frontend Implementation',
            content: [`The frontend requires these key components:`,
                `1. Web3 Connection Setup
                 2. Core Functions`,
                `Key features to implement:`,
                `- Wallet connection
                - Ticket purchase interface
                - Live lottery status
                - Winner announcement
            - Transaction history`],
            codeBlocks: [
                {
                    language: 'javascript',
                    code: `import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    provider.getSigner()
);`
                },
                {
                    language: 'javascript',
                    code: `const buyTicket = async () => {
    const tx = await contract.buyTicket({ 
        value: ticketPrice 
    });
    await tx.wait();
};

const checkPrize = async () => {
    const prize = await contract.getPrize(address);
    return prize;
};`
                }
            ]
        },
        {
            sectionTitle: 'Testing and Deployment',
            content: [`Essential testing steps:`,

                `1. Contract Testing
                 2. Deployment Process:`,
                `- Deploy on testnet (Goerli/Sepolia)
            - Verify contract on Etherscan
            - Test all functions with real transactions
            - Deploy to mainnet`],
            codeBlocks: [
                {
                    language: 'javascript',
                    code: `describe("Lottery", function() {
    it("Should allow ticket purchase", async function() {
        const Lottery = await ethers.getContractFactory("Lottery");
        const lottery = await Lottery.deploy();
        await lottery.deployed();
        
        await lottery.buyTicket({ value: ticketPrice });
        const hasTicket = await lottery.hasTicket(owner.address);
        expect(hasTicket).to.equal(true);
    });
});`
                }
            ]
        },
        {
            sectionTitle: 'Future Enhancements',
            content: [`Potential improvements to consider:`,

                `1. Multiple Ticket Tiers: Different price points and prize pools
                2. Token Integration: Use custom tokens for tickets
                3. DAO Governance: Community-controlled parameters
                4. Cross-chain Support: Deploy on multiple networks`,

                `Focus on scalability and gas optimization when implementing new features.`]
        }
    ],
    tableOfContents: [
        'Project Overview',
        'Smart Contract Architecture',
        'Frontend Implementation',
        'Testing and Deployment',
        'Future Enhancements'
    ]
};

const article_3 = fullArticle;

export default article_3;