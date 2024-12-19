import { ProjectPreview, Dependency, FullProject } from '../projectInterfaces'
import img from '../../../assets/peer-link.png'

const peerLinkPreview: ProjectPreview = {
    title: 'Peerlink',
    description: '*(NOTE) Must have Metamask installed, mobile users must be within a wallet explorer.* PeerLink is a decentralized social network that lets users add friends and create groups on the blockchain.',
    date: 'October 5th, 2024 ',
    languages: ["JavaScript", "Solidity", 'CSS'],
    frameworks: ["Web3.js", "React"],
    imageUrl: img,
    url: 'https://peer-link-5rkvbl22j-trevarious-projects.vercel.app/',
    gitLink: 'https://github.com/trevarious/peer_link'
}

const chainlinkVRF: Dependency = {
    name: 'Openzeppelin Contracts.',
    description: 'Gold standard of smart contracts for token standards.'
}
const dependencies = [chainlinkVRF];

const peerLink: FullProject = {
    summary: 'PeerLink is a decentralized Ethereum-based dice game that uses Chainlink VRF for secure randomness. Players bet on dice rolls with options like exact number or parity, and the game includes a streak bonus system and configurable parameters for a dynamic gaming experience',
    ...peerLinkPreview,
    dependencies
}

export default peerLink;