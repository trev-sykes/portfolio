// Importing interfaces and image
import { FullProject } from '../projectInterfaces'
import img from '../../../assets/landing_template.png'
import gif from "../../../assets/landingPage.gif"

const landingTemplate: FullProject = {
    title: 'Landing Template',
    shortDescription: 'Modern, animated landing page template for small businesses',
    description: 'A versatile landing page template featuring smooth CSS transitions and dynamic animations.',
    date: {
        started: '2023-04-01',
        completed: '2023-04-23',
        lastUpdated: '2023-04-23'
    },
    status: 'completed',
    featured: false,
    techStack: {
        languages: ["JavaScript", "HTML", "CSS"],
        frameworks: [],
        tools: ["Git", "GitHub Pages", "Boxicons"],
        databases: []
    },
    images: {
        thumbnail: img,
        preview: gif,
        screenshots: [
            // Add screenshots of different sections and responsive views
        ]
    },
    links: [
        {
            type: 'live',
            url: 'https://trev-sykes.github.io/Boilerplate-Landing-Page/',
            label: 'Live Demo'
        },
        {
            type: 'github',
            url: 'https://github.com/trev-sykes/Boilerplate-Landing-Page',
            label: 'Source Code'
        }
    ],
    features: [
        'Responsive design that works across all device sizes',
        'Smooth CSS transitions and animations',
        'Modern navigation with hamburger menu for mobile',
        'Hero section with dynamic content',
        'Features showcase with hover effects',
        'Contact form with validation',
        'Footer with social media integration',
        'Optimized performance with minimal dependencies',
        'Easy-to-customize color schemes and typography'
    ],
    challenges: [
        {
            description: 'Creating smooth animations without impacting performance',
            solution: 'Implemented CSS transitions with transform properties for optimal performance and reduced layout thrashing'
        },
        {
            description: 'Building a responsive design that maintains visual appeal',
            solution: 'Used CSS Grid and Flexbox with carefully planned breakpoints to ensure consistent layout across devices'
        },
        {
            description: 'Ensuring accessibility while maintaining visual appeal',
            solution: 'Implemented ARIA labels, semantic HTML, and keyboard navigation while preserving dynamic features'
        },
        {
            description: 'Optimizing load times with minimal dependencies',
            solution: 'Utilized modern CSS features and optimized assets to reduce reliance on external libraries'
        }
    ],
    dependencies: [
        {
            name: 'Boxicons',
            version: '^2.1.4',
            description: 'High-quality web icons library',
            purpose: 'Provides consistent, scalable icons for navigation and social media elements'
        }
    ],
    summary: `A professional landing page template designed with modern web standards and best practices in mind. 
    The template features smooth CSS transitions and dynamic animations that enhance user engagement while maintaining 
    performance and accessibility. Built with vanilla JavaScript and CSS, it offers a lightweight solution that can be 
    easily customized for various business sectors while ensuring optimal loading times and user experience.`,
    inspiration: `The inspiration for this landing page template came from the need to create a versatile, 
    professional foundation for small businesses entering the digital space. The focus on CSS transitions and dynamic movements 
    was driven by the desire to create engaging user experiences that maintain modern web design standards while ensuring 
    accessibility and ease of customization.`,
    codeBlocks: [
        {
            language: 'css',
            fileName: 'animations.css',
            content: `/* Example of optimized CSS animation */
.hero-content {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-content.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Responsive navigation animation */
.nav-menu {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
}

.nav-menu.active {
    transform: translateX(0);
}`,
            description: 'Core animation components showing performance-optimized transitions'
        },
        {
            language: 'javascript',
            fileName: 'intersection-observer.js',
            content: `// Smooth scroll reveal implementation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});`,
            description: 'Implementation of smooth scroll animations using Intersection Observer'
        }
    ],
    learnings: [
        'Mastered CSS transitions and animations for enhanced UX',
        'Improved responsive design implementation techniques',
        'Gained expertise in performance optimization for animations',
        'Enhanced understanding of accessibility requirements',
        'Developed skills in creating maintainable, scalable CSS architecture'
    ],
    futureImprovements: [
        'Add dark mode support with theme switcher',
        'Implement lazy loading for images and sections',
        'Create additional page templates (About, Services, etc.)',
        'Add customization panel for easy styling changes',
        'Implement automated testing for responsive layouts',
        'Add more animation variants and transitions',
        'Create documentation for customization options'
    ]
};

export default landingTemplate;