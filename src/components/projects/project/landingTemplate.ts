// Importing interfaces and image
import { ProjectPreview, Dependency, FullProject, TechStack } from '../projectInterfaces'
import img from '../../../assets/landing-template.png'

// Defining the tech stack (languages and frameworks)
const techStack: TechStack = {
    languages: ["JavaScript", 'HTML', 'CSS'],
    frameworks: []
};

// Defining the project preview (common project details)
const landingTemplatePreview: ProjectPreview = {
    title: 'Landing-Template',
    description: 'Landing page template for a small business',
    date: 'April 23, 2023',
    techStack,  // Including the tech stack here
    imageUrl: img,
    url: 'https://trev-sykes.github.io/Boilerplate-Landing-Page/',
    gitLink: 'https://github.com/trev-sykes/Boilerplate-Landing-Page'
};

// Defining the dependencies (libraries used in the project)
const boxicons: Dependency = {
    name: 'Boxicons',
    description: 'A dependency for icons used in the navigation and footer sections'
};

// List of dependencies
const dependencies: Dependency[] = [boxicons];

// Defining the inspiration for the project
const inspiration: string = `The inspiration for this landing page template came from the need to create a versatile, 
professional foundation for small businesses entering the digital space. The focus on CSS transitions and dynamic movements 
was driven by the desire to create engaging user experiences that maintain modern web design standards while ensuring 
accessibility and ease of customization.`;

// Full project data (extends preview with additional details)
const landingTemplate: FullProject = {
    summary: 'A landing page template designed to be compatible with plenty of ecommerce sectors. CSS transitions are the main focus for this project, highlighting dynamic transitions and movement within the landing page.',
    ...landingTemplatePreview,  // Spreading project preview into the full project
    dependencies,  // Including the list of dependencies
    inspiration   // Adding inspiration for the project
};

export default landingTemplate;