// Importing interfaces and image
import { ProjectPreview, Dependency, FullProject, TechStack } from '../projectInterfaces'
import img from '../../../assets/lucky-6.png'
import gif from "../../../assets/lucky-6.png"

// Defining the tech stack (languages and frameworks)
const techStack: TechStack = {
  languages: ["JavaScript", "Solidity", "HTML", "CSS"],
  frameworks: ["React", "Vite"]
};

// Defining the project preview (common project details)
const luckySixPreview: ProjectPreview = {
  title: 'Lucky6',
  description: 'Decentralized gambling app',
  date: 'January 27, 2024',
  techStack,  // Including the tech stack here
  imageUrl: img,
  url: 'https://meta-roll.vercel.app/',
  gitLink: 'https://github.com/trevarious/lucky'
};

// Defining the dependencies (libraries used in the project)
const chainlinkVRF: Dependency = {
  name: 'Chainlink VRF',
  description: 'Provides secure, verifiable randomness for smart contracts.'
};

// List of dependencies
const dependencies: Dependency[] = [chainlinkVRF];

// Defining the inspiration for the project (you can modify this as needed)
const inspiration: string = `The inspiration for Lucky6 stemmed from the desire to build a fair and decentralized gambling experience, 
where the outcome is determined by secure, verifiable randomness. Leveraging Ethereum and Chainlink VRF ensures that the game is transparent, 
trustless, and tamper-proof, providing players with confidence in the fairness of each dice roll.`;

// Full project data (extends preview with additional details)
const luckySix: FullProject = {
  gif,
  summary: 'RollSixWin is a decentralized Ethereum-based dice game that uses Chainlink VRF for fair randomness. Players can bet on dice rolls, with options like guessing an exact number or whether the roll will be odd or even. The game features a streak bonus system and customizable betting parameters, offering a dynamic and engaging gambling experience.',
  ...luckySixPreview,  // Spreading project preview into the full project
  dependencies,  // Including the list of dependencies
  inspiration   // Adding inspiration for the project
};

export default luckySix;
