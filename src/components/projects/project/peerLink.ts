// Importing interfaces and image
import { FullProject } from '../projectInterfaces'
import img from '../../../assets/peer-link.png'
import gif from "../../../assets/peerlink.gif"

const peerLink: FullProject = {
    title: 'PeerLink',
    shortDescription: 'Decentralized social network built on Ethereum blockchain',
    description: 'PeerLink is a social-graph allowing users with a web3 wallet to sign up and connect.',
    date: {
        started: '2024-09-01',
        completed: '2024-10-05',
        lastUpdated: '2024-10-05'
    },
    status: 'completed',
    featured: true,
    techStack: {
        languages: ["JavaScript", "Solidity", "CSS", "HTML"],
        frameworks: ["React", "Web3.js"],
        tools: ["MetaMask", "Git", "Vercel", "Hardhat"],
        databases: ["Ethereum Blockchain"]
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
            url: 'https://peer-link-5rkvbl22j-trevarious-projects.vercel.app/',
            label: 'Live Demo'
        },
        {
            type: 'github',
            url: 'https://github.com/trev-sykes/peer_link',
            label: 'Source Code'
        }
    ],
    features: [
        'Decentralized friend request and acceptance system',
        'Blockchain-based group creation and management',
        'MetaMask integration for secure authentication',
        'On-chain social graph storage',
        'Real-time updates using Web3 events',
        'Privacy-focused user interactions'
    ],
    challenges: [
        {
            description: 'Implementing efficient on-chain social connections',
            solution: 'Utilized optimized smart contract structures and events for managing social relationships'
        },
        {
            description: 'Managing MetaMask integration across different devices',
            solution: 'Implemented robust wallet detection and connection handling with clear user guidance'
        },
        {
            description: 'Optimizing gas costs for social interactions',
            solution: 'Designed efficient smart contract methods and batch processing where applicable'
        }
    ],
    dependencies: [
        {
            name: 'OpenZeppelin Contracts',
            version: '^4.9.0',
            description: 'Gold standard of smart contracts for token standards',
            purpose: 'Provides secure, tested, and community-reviewed smart contract implementations'
        },
        {
            name: 'Web3.js',
            version: '^1.9.0',
            description: 'Ethereum JavaScript API',
            purpose: 'Enables interaction with local or remote Ethereum nodes'
        },
        {
            name: 'Hardhat',
            version: '^2.14.0',
            description: 'Development environment for Ethereum software',
            purpose: 'Used for compiling, deploying, testing, and debugging Ethereum software'
        }
    ],
    summary: `PeerLink is a decentralized social network built on Ethereum that enables users to create and manage their social connections on the blockchain. 
    The platform allows users to add friends, create groups, and interact in a decentralized manner, ensuring data privacy and user autonomy. 
    With MetaMask integration, users can securely manage their identity and interactions while maintaining full control over their social graph.`,
    inspiration: `The inspiration behind PeerLink comes from a vision to create a truly decentralized social networking platform. 
    By leveraging blockchain technology, the project aims to give users complete control over their social connections and group interactions, 
    free from traditional centralized platforms. The goal was to demonstrate how blockchain can be used to create meaningful social applications 
    that prioritize user privacy and data ownership.`,
    codeBlocks: [
        {
            language: 'solidity',
            fileName: 'PeerLink.sol',
            content: `// Example of friend request functionality
function sendFriendRequest(address _to) public {
    require(_to != msg.sender, "Cannot send request to yourself");
    require(!friends[msg.sender][_to], "Already friends");
    require(!friendRequests[msg.sender][_to], "Request already sent");
    
    friendRequests[msg.sender][_to] = true;
    emit FriendRequestSent(msg.sender, _to);
}`,
            description: 'Core smart contract function for sending friend requests with proper validation'
        }
    ],
    learnings: [
        'Gained deep understanding of Web3 development and blockchain social interactions',
        'Improved smart contract optimization and gas efficiency techniques',
        'Enhanced knowledge of decentralized application architecture',
        'Learned best practices for Web3 user experience design'
    ],
    futureImprovements: [
        'Implement decentralized content storage using IPFS',
        'Add encrypted messaging functionality',
        'Create mobile-optimized interface',
        'Add DAO governance for platform decisions',
        'Implement layer 2 scaling solution for reduced gas fees'
    ]
};

export default peerLink;