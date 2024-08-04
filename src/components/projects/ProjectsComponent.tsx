import { useState, useRef } from 'react';
import { projects } from './project';
import styles from './ProjectsComponent.module.css';

const ProjectsComponent = () => {
    const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
    const [ ] = useState<boolean>(false); 
    const projectRefs = useRef<HTMLDivElement[]>([]); 
    const headingRef = useRef<HTMLDivElement>(null);


    const handleReadFullDescription = (index: number) => {
        if (!expandedProjects.includes(index)) {
            console.log(`Expanding project ${index}`);
            setExpandedProjects([...expandedProjects, index]);
        } else {
            console.log(`Collapsing project ${index}`);
            setExpandedProjects(expandedProjects.filter((item) => item !== index));
        }
    };
    
    return (
        <>
            <div className={`${styles.projects}`}>
                <h1 ref={headingRef}>
                    {/* Typewriter effect can be added here if needed */}
                    Projects
                </h1>
            </div>

            <div className={styles.container}>
                {(
                    <div className={styles.projectContainer}>
                        {projects.slice().reverse().map((project, index) => (
                            <div
                                key={index}
                                className={`${styles.projectPreview} ${styles.fadeIn}`}
                                ref={(el) => (projectRefs.current[index] = el as HTMLDivElement)}
                            >
                                <img src={project.imageUrl} alt={project.title} className={styles.image} />
                                <h2 className={styles.projectTitle}>{project.title}</h2>
                                <p>
                                    {expandedProjects.includes(index) ? project.description : project.description.substring(0, 100)}
                                    {project.description.length > 100 && (
                                        <button
                                            className={`${styles.readMoreButton} ${expandedProjects.includes(index) ? styles.readLessActive : ''}`}
                                            onClick={() => handleReadFullDescription(index)}
                                        >
                                            {expandedProjects.includes(index) ? '...Read less' : '...Read more'}
                                        </button>
                                    )}
                                </p>
                                <p className={styles.date}>{project.date}</p>
                                <h4 className={styles.languageHeader}>Languages/Frameworks</h4>
                                <div className={styles.topics}>
                                    {project.languages.map((language, topicIndex) => {
                                        let topicClass = '';
                                        switch (language) {
                                            case 'JavaScript':
                                                topicClass = styles.javascript;
                                                break;
                                            case 'HTML':
                                                topicClass = styles.html;
                                                break;
                                            case 'CSS':
                                                topicClass = styles.css;
                                                break;
                                            case 'Solidity':
                                                topicClass = styles.solidity;
                                                break;
                                            default:
                                                topicClass = '';
                                        }
                                        return (
                                            <span key={topicIndex} className={`${styles.topic} ${topicClass}`}>
                                                {language}
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className={styles.languages}>
                                {project.frameworks.map((language, topicIndex) => {
                                        let languageClass = '';
                                        switch (language) {
                                            case 'React':
                                                languageClass = styles.react;
                                                break;
                                            case 'Vite':
                                                languageClass = styles.vite;
                                                break;
                                            case 'Web3.js':
                                                languageClass = styles.web3;
                                                break;
                                            default:
                                                languageClass = '';
                                        }
                                        return (
                                            <span key={topicIndex} className={`${styles.language} ${languageClass}`}>
                                                {language}
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className={styles.linkContainer}>
                                <a 
                                href={project.url}
                                className={styles.readFullProjectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                >Visit Site</a>
                                <a 
                                href={project.gitLink}
                                className={styles.gitLink}
                                target='_blank'
                                rel='noopen noreferrer'
                                >Source Code</a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProjectsComponent;
