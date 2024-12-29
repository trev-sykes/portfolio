// Importing interfaces and image
import { FullProject } from '../projectInterfaces'
import img from '../../../assets/roll-six-win.png'
import gif from "../../../assets/roll-six-win.gif"

const rollSixWin: FullProject = {
  title: 'Roll Six Win',
  shortDescription: 'Decentralized dice game with provably fair gameplay on Polygon',
  description: 'A blockchain-based dice game built on the Polygon network that utilizes Chainlink VRF for verifiable randomness, offering transparent and fair gambling experiences.',
  date: {
    started: '2024-07-01',
    completed: '2024-07-30',
    lastUpdated: '2024-07-30'
  },
  status: 'completed',
  featured: true,
  techStack: {
    languages: ["JavaScript", "Solidity", "HTML", "CSS"],
    frameworks: ["Web3.js"],
    tools: ["MetaMask", "Hardhat", "Polygon", "Chainlink VRF"],
    databases: ["Polygon Blockchain"]
  },
  images: {
    thumbnail: img,
    preview: gif,
    screenshots: [
      // Add gameplay screenshots, winning moments, etc.
    ]
  },
  links: [
    {
      type: 'live',
      url: 'https://trev-sykes.github.io/roll-six-win/',
      label: 'Play Game'
    },
    {
      type: 'github',
      url: 'https://github.com/trev-sykes/roll-six-win',
      label: 'Source Code'
    }
  ],
  features: [
    'Verifiable random number generation using Chainlink VRF',
    'Multiple betting options (exact number, odd/even)',
    'Streak bonus system for consecutive wins',
    'Real-time bet tracking and result verification',
    'Automated payout system',
    'Mobile-friendly interface with MetaMask integration',
    'Transparent odds and house edge',
    'Multiple betting denominations'
  ],
  challenges: [
    {
      description: 'Implementing truly random number generation on blockchain',
      solution: 'Integrated Chainlink VRF for provably fair and verifiable randomness'
    },
    {
      description: 'Managing game state during Chainlink VRF callback',
      solution: 'Implemented robust state management system with proper event emission'
    },
    {
      description: 'Optimizing gas costs for frequent betting transactions',
      solution: 'Streamlined contract logic and utilized Polygon network for lower transaction fees'
    },
    {
      description: 'Ensuring fair streak bonus mechanics',
      solution: 'Designed balanced reward system with mathematical modeling for sustainability'
    }
  ],
  dependencies: [
    {
      name: 'Chainlink VRF',
      version: '^0.4.0',
      description: 'Provides secure, verifiable randomness for smart contracts',
      purpose: 'Ensures provably fair random number generation for game outcomes'
    },
    {
      name: 'Web3.js',
      version: '^1.9.0',
      description: 'Ethereum JavaScript API',
      purpose: 'Handles blockchain interactions and transaction management'
    },
    {
      name: 'Hardhat',
      version: '^2.14.0',
      description: 'Development environment for Ethereum software',
      purpose: 'Used for contract compilation, testing, and deployment'
    }
  ],
  summary: `Roll Six Win is an innovative decentralized dice game built on the Polygon network that combines blockchain security with engaging gameplay mechanics. 
    Using Chainlink VRF for verifiable randomness, players can confidently place bets on various dice roll outcomes, including exact numbers and parity predictions. 
    The game features a unique streak bonus system that rewards consistent winners, while maintaining configurable parameters to ensure a balanced and sustainable gaming experience. 
    Built with Web3.js and Solidity, the platform demonstrates how blockchain technology can create transparent, fair, and entertaining gambling experiences.`,
  inspiration: `The inspiration behind Roll Six Win came from a desire to create a transparent and fair gambling experience using blockchain technology. 
    By leveraging Chainlink's VRF (Verifiable Random Function), the project demonstrates how decentralized applications can provide provably fair gaming experiences. 
    The goal was to create an engaging game that combines the excitement of traditional dice games with the security and transparency of blockchain technology, 
    while also exploring the implementation of features like streak bonuses to enhance player engagement.`,
  codeBlocks: [
    {
      language: 'solidity',
      fileName: 'RollSixWin.sol',
      content: `// Example of dice roll function using Chainlink VRF
function rollDice() public payable {
    require(msg.value >= minimumBet, "Bet too small");
    require(msg.value <= maximumBet, "Bet too large");
    
    // Request random number from Chainlink VRF
    uint256 requestId = requestRandomness(keyHash, fee);
    
    // Store player's bet details
    games[requestId] = Game({
        player: msg.sender,
        bet: msg.value,
        processed: false
    });
    
    emit DiceRollRequested(requestId, msg.sender, msg.value);
}`,
      description: 'Core game function showing bet validation and Chainlink VRF integration'
    }
  ],
  learnings: [
    'Mastered integration of Chainlink VRF for verifiable randomness',
    'Developed expertise in building provably fair gaming systems',
    'Improved understanding of blockchain-based gambling mechanics',
    'Enhanced skills in gas optimization for gaming contracts',
    'Gained experience with Polygon network deployment'
  ],
  futureImprovements: [
    'Add multiplayer functionality for competitive play',
    'Implement tournament mode with leaderboards',
    'Create additional betting options and game modes',
    'Add social features like player statistics and achievements',
    'Implement progressive jackpot system',
    'Develop mobile-native application'
  ]
};

export default rollSixWin;