import { ProjectPreview, Dependency, FullProject } from '../projectInterfaces'
import img from '../../../assets/lucky-6.png'

const luckySixPreview : ProjectPreview =     {
    title: 'Lucky6',
    description: 'Decentralized gambling app',
    date: 'January 27, 2024',
    languages: ["JavaScript","Solidity", 'HTML','CSS'],
    frameworks:["React", "Vite"],
    imageUrl: img,
    url: 'https://meta-roll.vercel.app/'
  }

  const chainlinkVRF: Dependency = {
    name: 'Chainlink VRF',
    description: 'Provides secure, verifiable randomness for smart contracts.'
}
const dependencies = [chainlinkVRF];

const luckySix : FullProject = {
    summary: 'RollSixWin is a decentralized Ethereum-based dice game using Chainlink VRF for fair randomness. Players bet on dice rolls with options like exact number or parity, and the game features a streak bonus system and configurable parameters.',
    ...luckySixPreview,
    dependencies 
}

export default luckySix;