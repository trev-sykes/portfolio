// Importing interfaces and image
import { ProjectPreview, Dependency, FullProject, TechStack } from '../projectInterfaces'
import img from '../../../assets/roll-six-win.png'

// Defining the tech stack (languages and frameworks)
const techStack: TechStack = {
  languages: ["JavaScript", "Solidity", 'HTML', 'CSS'],
  frameworks: ["Web3.js"]
};

// Defining the project preview (common project details)
const rollSixWinPreview: ProjectPreview = {
  title: 'Roll Six Win',
  description: '*(NOTE) Must have Metamask installed, mobile users must be within a wallet explorer.* Decentralized dice game built on Polygon network',
  date: 'July 30, 2024',
  techStack,  // Including the tech stack here
  imageUrl: img,
  url: 'https://trev-sykes.github.io/roll-six-win/',
  gitLink: 'https://github.com/trev-sykes/roll-six-win'
};

// Defining the dependencies (libraries used in the project)
const chainlinkVRF: Dependency = {
  name: 'Chainlink VRF',
  description: 'Provides secure, verifiable randomness for smart contracts.'
};

// List of dependencies
const dependencies: Dependency[] = [chainlinkVRF];

// Defining the inspiration for the project
const inspiration: string = `The inspiration behind Roll Six Win came from a desire to create a transparent and fair gambling experience using blockchain technology. 
By leveraging Chainlink's VRF (Verifiable Random Function), the project demonstrates how decentralized applications can provide provably fair gaming experiences. 
The goal was to create an engaging game that combines the excitement of traditional dice games with the security and transparency of blockchain technology, 
while also exploring the implementation of features like streak bonuses to enhance player engagement.`;

// Full project data (extends preview with additional details)
const rollSixWin: FullProject = {
  summary: `Roll Six Win is an innovative decentralized dice game built on the Polygon network that combines blockchain security with engaging gameplay mechanics. 
    Using Chainlink VRF for verifiable randomness, players can confidently place bets on various dice roll outcomes, including exact numbers and parity predictions. 
    The game features a unique streak bonus system that rewards consistent winners, while maintaining configurable parameters to ensure a balanced and sustainable gaming experience. 
    Built with Web3.js and Solidity, the platform demonstrates how blockchain technology can create transparent, fair, and entertaining gambling experiences.`,
  ...rollSixWinPreview,  // Spreading project preview into the full project
  dependencies,  // Including the list of dependencies
  inspiration   // Adding inspiration for the project
};

export default rollSixWin;