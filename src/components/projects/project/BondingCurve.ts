// Importing interfaces and image
import { FullProject } from '../projectInterfaces'
import img from '../../../assets/bonding_curve.png'
import gif from "../../../assets/tokenizedAssetSimulator.gif"
// Example implementation
const bondingCurveSimulator: FullProject = {
    title: 'Bonding Curve Simulator',
    shortDescription: 'Interactive visualization of tokenomics and market behavior using bonding curves',
    description: 'A dynamic, interactive visualization of price fluctuations using a Bonding Curve algorithm.',
    date: {
        started: '2024-11-15',
        completed: '2024-12-08',
        lastUpdated: '2024-12-08'
    },
    status: 'completed',
    featured: true,
    techStack: {
        languages: ["JavaScript", "HTML", "CSS"],
        frameworks: ["React"],
        tools: ["Git", "npm", "Vercel"],
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
            url: 'https://bonding-curve-asset-simulator.vercel.app/',
            label: 'Live Demo'
        },
        {
            type: 'github',
            url: 'https://github.com/trevarious/BondingCurveAssetSimulator',
            label: 'Source Code'
        }
    ],
    features: [
        'Real-time price simulation using bonding curve algorithms',
        'Interactive chart visualization with ReCharts',
        'Support for multiple curve types (linear and logarithmic)',
        'Dynamic trade simulation with random execution',
        'Responsive Material UI design'
    ],
    challenges: [
        {
            description: 'Implementing real-time price updates without impacting performance',
            solution: `Utilized React's useCallback and useMemo hooks for optimization, implemented efficient state management`
        },
        {
            description: 'Creating smooth chart animations with large datasets',
            solution: 'Implemented data windowing and optimized ReCharts configuration for better performance'
        }
    ],
    dependencies: [
        {
            name: 'ReCharts',
            version: '^2.8.0',
            description: 'A React library for creating interactive and dynamic charts',
            purpose: 'Chosen for its performance with real-time data and extensive customization options'
        },
        {
            name: 'Material UI',
            version: '^5.0.0',
            description: 'React component library based on Material Design',
            purpose: 'Provides consistent, professional UI components with built-in responsiveness'
        }
    ],
    summary: `The Bonding Curve Simulator is an interactive price simulator that models the behavior of assets within a bonding curve market. 
    Using a simple algorithm, it dynamically calculates the price of an asset based on the total amount of trades made, creating an intuitive visual representation of price evolution and volume over time.
    The chart updates in real-time as trades occur, providing immediate feedback and helping users understand the inherent price volatility and liquidity mechanics at play in such a system.`,
    inspiration: `The inspiration behind the Bonding Curve Simulator comes from a personal curiosity about how markets and decentralized economies work. 
    I wanted to explore how the concept of a bonding curve, often used in tokenomics, affects the price of assets in a dynamic, self-sustaining system. 
    This project allowed me to visualize this complex concept by simulating a marketplace where trades are randomly executed, and the results are reflected in real-time as price movements and volume trends. 
    Ultimately, my goal was to create a tool that would help others better understand the dynamics of bonding curves and the broader principles of economic systems in the world of blockchain and cryptocurrency.`,
    codeBlocks: [
        {
            language: 'typescript',
            fileName: 'bondingCurves.ts',
            content: `export const bondingCurves = {
    lin: (initialPrice: number, scalingFactor: number, currentSupply: number): number => {
        return initialPrice + (scalingFactor * currentSupply);
    },
    log: (initialPrice: number, scalingFactor: number, currentSupply: number): number => {
        return initialPrice + Math.log(scalingFactor * currentSupply + 1);
    },
};`,
            description: 'Core bonding curve calculations implementing both linear and logarithmic pricing models'
        }
    ],
    learnings: [
        'Deepened understanding of tokenomics and market mechanics',
        'Improved skills in real-time data visualization',
        'Gained experience with performance optimization in React',
        'Enhanced understanding of state management patterns'
    ],
    futureImprovements: [
        'Add support for custom bonding curve formulas',
        'Implement trade history visualization',
        'Add more advanced market simulation parameters',
        'Create educational tutorials and documentation'
    ]
};

export default bondingCurveSimulator;