// Importing interfaces and image
import { ProjectPreview, Dependency, FullProject, TechStack } from '../projectInterfaces'
import img from '../../../assets/crypto-scope.png'
import gif from "../../../assets/crypto-scope.png"

// Defining the tech stack (languages and frameworks)
const techStack: TechStack = {
    languages: ["JavaScript", "HTML", "CSS"],
    frameworks: []
};

// Defining the project preview (common project details)
const cryptoScopePreview: ProjectPreview = {
    title: 'Crypto-Scope',
    description: 'Tool for charting crypto assets',
    date: 'August 23, 2023',
    techStack,  // Including the tech stack here
    imageUrl: img,
    url: 'https://trevarious.github.io/Crypto-Scope/',
    gitLink: 'https://github.com/trevarious/Crypto-Scope?tab=readme-ov-file'
};

// Defining the dependencies (libraries used in the project)
const coinGecko: Dependency = {
    name: 'CoinGecko API',
    description: 'Provides real-time and historical cryptocurrency data'
};

const googleCharts: Dependency = {
    name: 'Google Charts Library',
    description: 'Renders charts for visualizing cryptocurrency price data.'
};

// List of dependencies
const dependencies: Dependency[] = [coinGecko, googleCharts];

// Defining the inspiration for the project (you might want to add this if applicable)
const inspiration: string = `The inspiration behind Crypto-Scope came from a need for an easy-to-use tool to track and visualize cryptocurrency data. 
With the dynamic nature of crypto markets, having an intuitive and interactive charting tool becomes essential for tracking trends and making informed decisions.`;

// Full project data (extends preview with additional details)
const cryptoScope: FullProject = {
    gif,
    summary: 'A tool used to fetch and visualize cryptocurrency price data. This project highlights an ability to manipulate and display real-time data in a dynamic way, providing users with a clear and informative interface for tracking cryptocurrency prices.',
    ...cryptoScopePreview,  // Spreading project preview into the full project
    dependencies,  // Including the list of dependencies
    inspiration   // Adding inspiration for the project
};

export default cryptoScope;
