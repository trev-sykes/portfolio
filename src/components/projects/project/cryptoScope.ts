// Importing interfaces and image
import { FullProject, TechStack, Dependency, ProjectLink, CodeBlock } from '../projectInterfaces';
import img from '../../../assets/crypto_scope.png';
import gif from "../../../assets/crypto_scope.png";

// Defining the tech stack (languages, frameworks, tools, and databases)
const techStack: TechStack = {
    languages: ["JavaScript", "HTML", "CSS"],
    frameworks: [],
    tools: ["Git", "CoinGecko API", "Google Charts"],
    databases: []
};

// Defining project links
const links: ProjectLink[] = [
    {
        url: 'https://trevarious.github.io/Crypto-Scope/',
        type: 'live',
        label: 'Live Demo'
    },
    {
        url: 'https://github.com/trevarious/Crypto-Scope?tab=readme-ov-file',
        type: 'github',
        label: 'GitHub Repository'
    }
];

// Defining the dependencies (libraries used in the project)
const dependencies: Dependency[] = [
    {
        name: 'CoinGecko API',
        version: 'v3',
        description: 'Provides real-time and historical cryptocurrency data.',
        purpose: 'Fetch cryptocurrency price and market data for visualization.'
    },
    {
        name: 'Google Charts Library',
        description: 'Renders charts for visualizing cryptocurrency price data.',
        purpose: 'Display dynamic and interactive charts of cryptocurrency data.'
    }
];

// Defining code blocks (example, replace with actual code snippets if needed)
const codeBlocks: CodeBlock[] = [
    {
        language: 'JavaScript',
        content: `fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
                  .then(response => response.json())
                  .then(data => console.log(data));`,
        description: 'Fetches the current price of Bitcoin in USD from the CoinGecko API.',
        fileName: 'fetchCryptoData.js'
    }
];

// Full project data (complete details about the project)
const cryptoScope: FullProject = {
    title: 'Crypto-Scope',
    shortDescription: 'A tool for charting and visualizing cryptocurrency data.',
    description: 'Crypto-Scope is a user-friendly tool that fetches and displays real-time cryptocurrency data, providing dynamic charts for better insights into the crypto market.',
    date: {
        started: '2023-08-01',
        completed: '2023-08-23',
        lastUpdated: '2023-08-23'
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
    summary: 'A tool used to fetch and visualize cryptocurrency price data. This project highlights an ability to manipulate and display real-time data in a dynamic way, providing users with a clear and informative interface for tracking cryptocurrency prices.',
    features: [
        'Real-time cryptocurrency data fetching.',
        'Interactive and responsive chart rendering.',
        'User-friendly interface for navigating data.'
    ],
    challenges: [
        {
            description: 'Handling real-time API requests efficiently without overloading the API rate limits.',
            solution: 'Implemented caching and throttling mechanisms to manage API requests effectively.'
        },
        {
            description: 'Ensuring charts are interactive and responsive across devices.',
            solution: 'Used Google Charts Library to build interactive charts with responsive design principles.'
        }
    ],
    dependencies,
    inspiration: `The inspiration behind Crypto-Scope came from a need for an easy-to-use tool to track and visualize cryptocurrency data. 
    With the dynamic nature of crypto markets, having an intuitive and interactive charting tool becomes essential for tracking trends and making informed decisions.`,
    codeBlocks,
    futureImprovements: [
        'Add support for more cryptocurrencies and fiat currencies.',
        'Include advanced charting options such as moving averages and volume tracking.',
        'Introduce user authentication to save and track personal portfolios.'
    ],
    metrics: {
        performance: ['Loads charts within 2 seconds on average.', 'Minimal API rate limit hits.'],
        users: 'Over 100 active users within the first month of launch.'
    },
    learnings: [
        'Improved knowledge of API integrations and rate-limiting techniques.',
        'Enhanced skills in creating responsive web applications with dynamic data visualization.'
    ]
};

export default cryptoScope;
