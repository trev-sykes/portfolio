import { useState, useRef, useEffect } from 'react';
import { projects } from './project';
import ProjectFullPage from './ProjectsFullPage';
import styles from './ProjectsComponent.module.css';

const ProjectsComponent = () => {
    const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
    const [showFullPage, setShowFullPage] = useState<boolean>(false);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    // const [animatingProject, setAnimatingProject] = useState<number | null>(null);
    // const [typewriterStarted, setTypewriterStarted] = useState<boolean>(false);
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

    const handleCloseFullView = () => {
        setSelectedProject(null);
        // setAnimatingProject(null);
        setShowFullPage(false);
        document.body.style.overflow = '';
    };

    const handleResize = () => {
        setViewportWidth(window.innerWidth);
    };

    const handleShowAllBlogs = () => {
        setShowAllProjects(!showAllProjects);
    };

    useEffect(() => { }, [showAllProjects]);

    const handleScroll = () => {
        projectRefs.current.forEach((project) => {
            let rect: DOMRect = project?.getBoundingClientRect() || new DOMRect();
            const windowHeight = window.innerHeight;

            if (viewportWidth < 600) {
                project.style.opacity = '1';
            } else {
                if (rect.top < windowHeight && rect.bottom >= 0) {
                    const visibility = 1 - Math.max(0, (windowHeight + rect.top - 1450) / windowHeight);
                    project.style.opacity = visibility.toString();
                } else {
                    project.style.opacity = '0';
                }
            }
        });
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.0,
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        // setTypewriterStarted(true);
                    }, 300);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        projectRefs.current.forEach((project) => {
            if (project) {
                observer.observe(project);
            }
        });

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            projectRefs.current.forEach((project) => {
                if (project) {
                    observer.unobserve(project);
                }
            });
            if (headingRef.current) {
                observer.unobserve(headingRef.current);
            }
        };
    }, [viewportWidth]);

    const handleReadFullArticle = (index: number) => {
        setSelectedProject(index);
        setShowFullPage(true);
    };

    return (
        <>
            <div className={`${styles.projects}`}>
                <h1 ref={headingRef}>
                    Top Projects
                </h1>
            </div>

            <div className={styles.container}>
                <div className={styles.projectContainer}>
                    {projects.slice().reverse().map((project, index) => (
                        (showAllProjects || index < 2) && (
                            <div
                                key={index}
                                className={`${styles.projectPreview} ${styles.fadeIn}`}
                                ref={(el) => (projectRefs.current[index] = el as HTMLDivElement)}
                            >
                                <img src={project.imageUrl} alt={project.title} className={styles.image} loading='lazy' />
                                <h2 className={styles.projectTitle}>{project.title}</h2>
                                <p className={styles.description}>
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

                                {/* Safeguard for undefined techStack */}
                                <div className={styles.topics}>
                                    {(project.techStack?.languages || []).map((language, topicIndex) => {
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
                                    {(project.techStack?.frameworks || []).map((framework, topicIndex) => {
                                        let frameworkClass = '';
                                        switch (framework) {
                                            case 'React':
                                                frameworkClass = styles.react;
                                                break;
                                            case 'Vite':
                                                frameworkClass = styles.vite;
                                                break;
                                            case 'Web3.js':
                                                frameworkClass = styles.web3;
                                                break;
                                            default:
                                                frameworkClass = '';
                                        }
                                        return (
                                            <span key={topicIndex} className={`${styles.language} ${frameworkClass}`}>
                                                {framework}
                                            </span>
                                        );
                                    })}
                                </div>

                                <div className={styles.linkContainer}>
                                    <a
                                        className={styles.readFullArticleButton}
                                        onClick={() => handleReadFullArticle(projects.length - index - 1)}
                                    >
                                        Project Details
                                    </a>
                                    <a
                                        href={project.url}
                                        className={styles.visitSite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >Visit Site</a>
                                    <a
                                        href={project.gitLink}
                                        className={styles.sourceCode}
                                        target='_blank'
                                        rel='noopen noreferrer'
                                    >Source Code</a>
                                </div>
                            </div>
                        )
                    ))}
                    {selectedProject !== null && showFullPage && (
                        <ProjectFullPage selectedProject={selectedProject} onClose={handleCloseFullView} />
                    )}
                    {!showAllProjects ? (
                        <button className={styles.viewProjects} onClick={handleShowAllBlogs}>View More</button>
                    ) : (
                        <button className={`${styles.viewProjects} ${styles.viewLess}`} onClick={handleShowAllBlogs}>View Less</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjectsComponent;
