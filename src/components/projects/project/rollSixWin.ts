import { ProjectPreview, Dependency, FullProject } from '../projectInterfaces'
import img from '../../../assets/roll-six-win.png'

const rollSixWinPreview: ProjectPreview = {
  title: 'roll six win',
  description: '*(NOTE) Must have Metamask installed, mobile users must be within a wallet explorer.* Decentralized dice game built on Polygon network',
  date: 'July 30, 2024',
  languages: ["JavaScript", "Solidity", 'HTML', 'CSS'],
  frameworks: ["Web3.js"],
  imageUrl: img,
  url: 'https://trevarious.github.io/roll-six-win/',
  gitLink: 'https://github.com/trevarious/roll-six-win'
}

const chainlinkVRF: Dependency = {
  name: 'Chainlink VRF',
  description: 'Provides secure, verifiable randomness for smart contracts.'
}
const dependencies = [chainlinkVRF];

const rollSixWin: FullProject = {
  summary: 'RollSixWin is a decentralized Ethereum-based dice game using Chainlink VRF for fair randomness. Players bet on dice rolls with options like exact number or parity, and the game features a streak bonus system and configurable parameters.',
  ...rollSixWinPreview,
  dependencies
}

export default rollSixWin;