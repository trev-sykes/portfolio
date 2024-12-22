// Importing interfaces and image
import { ProjectPreview, Dependency, FullProject, TechStack } from '../projectInterfaces'
import img from '../../../assets/bonding-curve.png'
import gif from "../../../assets/tokenizedAssetSimulator.gif"

// Defining the tech stack (languages and frameworks)
const techStack: TechStack = {
    languages: ["JavaScript", 'HTML', 'CSS'],
    frameworks: ["React"]
};

// Defining the project preview (common project details)
const bondingCurveSimulatorPreview: ProjectPreview = {
    title: 'Bonding Curve Simulator',
    description: 'A dynamic, interactive visualization of price fluctuations using a Bonding Curve algorithm, designed to help users understand tokenomics and market behavior.',
    date: 'December 8th, 2024',
    techStack,  // Including the tech stack here
    imageUrl: img,
    url: 'https://bonding-curve-asset-simulator.vercel.app/',
    gitLink: 'https://github.com/trevarious/BondingCurveAssetSimulator'
};

// Defining the dependencies (libraries used in the project)
const reCharts: Dependency = {
    name: 'ReCharts',
    description: 'A React library used for creating interactive and dynamic charts, ideal for visualizing data in real-time.'
};
const MUI: Dependency = {
    name: 'Material UI',
    description: 'An open-source React component library offering pre-styled components based on Google’s Material Design, enabling rapid UI development.'
};

// List of dependencies
const dependencies: Dependency[] = [reCharts, MUI];

// Defining the inspiration for the project
const inspiration: string = `The inspiration behind the Bonding Curve Simulator comes from a personal curiosity about how markets and decentralized economies work. 
I wanted to explore how the concept of a bonding curve, often used in tokenomics, affects the price of assets in a dynamic, self-sustaining system. 
This project allowed me to visualize this complex concept by simulating a marketplace where trades are randomly executed, and the results are reflected in real-time as price movements and volume trends. 
Ultimately, my goal was to create a tool that would help others better understand the dynamics of bonding curves and the broader principles of economic systems in the world of blockchain and cryptocurrency.`;

// Full project data (extends preview with additional details)
const bondingCurveSimulator: FullProject = {
    gif,
    summary: `The Bonding Curve Simulator is an interactive price simulator that models the behavior of assets within a bonding curve market. 
    Using a simple algorithm, it dynamically calculates the price of an asset based on the total amount of trades made, creating an intuitive visual representation of price evolution and volume over time.
    The chart updates in real-time as trades occur, providing immediate feedback and helping users understand the inherent price volatility and liquidity mechanics at play in such a system.`,
    ...bondingCurveSimulatorPreview,  // Spreading project preview into the full project
    dependencies,  // Including the list of dependencies
    inspiration   // Adding inspiration for the project
};

export default bondingCurveSimulator;
