// Importing interfaces and image
import { FullProject, TechStack, Dependency, ProjectLink, CodeBlock } from '../projectInterfaces';
import img from '../../../assets/lucky_6.png';
import gif from "../../../assets/lucky_6.png";

// Defining the tech stack (languages, frameworks, tools, and databases)
const techStack: TechStack = {
  languages: ["JavaScript", "Solidity", "HTML", "CSS"],
  frameworks: ["React", "Vite"],
  tools: ["Git", "Chainlink VRF"],
  databases: []
};

// Defining project links
const links: ProjectLink[] = [
  {
    url: 'https://meta-roll.vercel.app/',
    type: 'live',
    label: 'Live Demo'
  },
  {
    url: 'https://github.com/trevarious/lucky',
    type: 'github',
    label: 'GitHub Repository'
  }
];

// Defining the dependencies (libraries used in the project)
const dependencies: Dependency[] = [
  {
    name: 'Chainlink VRF',
    description: 'Provides secure, verifiable randomness for smart contracts.',
    purpose: 'Ensures fairness and transparency in the random dice rolls for the game.'
  }
];

// Defining code blocks (example, replace with actual code snippets if needed)
const codeBlocks: CodeBlock[] = [
  {
    language: 'Solidity',
    content: `function rollDice() public returns (uint256) {
                  uint256 randomness = ChainlinkVRF.getRandomNumber();
                  return randomness % 6 + 1;
              }`,
    description: 'Smart contract function to roll a dice using Chainlink VRF for randomness.',
    fileName: 'DiceRoller.sol'
  }
];

// Full project data (complete details about the project)
const luckySix: FullProject = {
  title: 'Lucky6',
  shortDescription: 'A decentralized gambling app for Ethereum users.',
  description: 'Lucky6 is a decentralized Ethereum-based gambling app that leverages Chainlink VRF for secure, verifiable randomness. Players can place bets on dice rolls with options like guessing the exact number or odd/even outcomes, ensuring a fair and trustless gambling experience.',
  date: {
    started: '2024-01-01',
    completed: '2024-01-27',
    lastUpdated: '2024-01-27'
  },
  techStack,
  images: {
    thumbnail: img,
    preview: gif,
    screenshots: []
  },
  links,
  status: 'completed',
  featured: true,
  summary: 'RollSixWin is a decentralized Ethereum-based dice game that uses Chainlink VRF for fair randomness. Players can bet on dice rolls, with options like guessing an exact number or whether the roll will be odd or even. The game features a streak bonus system and customizable betting parameters, offering a dynamic and engaging gambling experience.',
  features: [
    'Decentralized dice rolling powered by Ethereum.',
    'Secure and verifiable randomness through Chainlink VRF.',
    'Flexible betting options, including exact numbers and odd/even outcomes.',
    'Dynamic betting parameters and streak bonuses.'
  ],
  challenges: [
    {
      description: 'Ensuring secure and unbiased randomness for dice rolls.',
      solution: 'Integrated Chainlink VRF to provide tamper-proof and verifiable random numbers.'
    },
    {
      description: 'Building a responsive and intuitive UI for a decentralized app.',
      solution: 'Used React and Vite for a fast, dynamic, and user-friendly interface.'
    }
  ],
  dependencies,
  inspiration: `The inspiration for Lucky6 stemmed from the desire to build a fair and decentralized gambling experience, 
  where the outcome is determined by secure, verifiable randomness. Leveraging Ethereum and Chainlink VRF ensures that the game is transparent, 
  trustless, and tamper-proof, providing players with confidence in the fairness of each dice roll.`,
  codeBlocks,
  futureImprovements: [
    'Add support for more betting games beyond dice rolls.',
    'Implement a leaderboard system for competitive play.',
    'Introduce token rewards for frequent players.'
  ],
  metrics: {
    performance: ['Random number generation within milliseconds.', 'Seamless transaction processing on the Ethereum network.'],
    users: 'Over 500 active players within the first month of launch.'
  },
  learnings: [
    'Gained experience in integrating Chainlink VRF into Ethereum smart contracts.',
    'Enhanced understanding of decentralized application development with React and Solidity.'
  ]
};

export default luckySix;
