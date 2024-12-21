// Importing interfaces and image
import { ProjectPreview, Dependency, FullProject, TechStack } from '../projectInterfaces'
import img from '../../../assets/peer-link.png'

// Defining the tech stack (languages and frameworks)
const techStack: TechStack = {
    languages: ["JavaScript", "Solidity", 'CSS'],
    frameworks: ["Web3.js", "React"]
};

// Defining the project preview (common project details)
const peerLinkPreview: ProjectPreview = {
    title: 'Peerlink',
    description: '*(NOTE) Must have Metamask installed, mobile users must be within a wallet explorer.* PeerLink is a decentralized social network that lets users add friends and create groups on the blockchain.',
    date: 'October 5th, 2024',
    techStack,  // Including the tech stack here
    imageUrl: img,
    url: 'https://peer-link-5rkvbl22j-trevarious-projects.vercel.app/',
    gitLink: 'https://github.com/trev-sykes/peer_link'
};

// Defining the dependencies (libraries used in the project)
const openzeppelinContracts: Dependency = {
    name: 'Openzeppelin Contracts',
    description: 'Gold standard of smart contracts for token standards.'
};

// List of dependencies
const dependencies: Dependency[] = [openzeppelinContracts];

// Defining the inspiration for the project
const inspiration: string = `The inspiration behind PeerLink comes from a vision to create a truly decentralized social networking platform. 
By leveraging blockchain technology, the project aims to give users complete control over their social connections and group interactions, 
free from traditional centralized platforms. The goal was to demonstrate how blockchain can be used to create meaningful social applications 
that prioritize user privacy and data ownership.`;

// Full project data (extends preview with additional details)
const peerLink: FullProject = {
    summary: 'PeerLink is a decentralized social network built on Ethereum that enables users to create and manage their social connections on the blockchain. The platform allows users to add friends, create groups, and interact in a decentralized manner, ensuring data privacy and user autonomy. With MetaMask integration, users can securely manage their identity and interactions while maintaining full control over their social graph.',
    ...peerLinkPreview,  // Spreading project preview into the full project
    dependencies,  // Including the list of dependencies
    inspiration   // Adding inspiration for the project
};

export default peerLink;