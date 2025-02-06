import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, ArrowLeft } from 'lucide-react';
import { projects } from './project';
import { useViewportSize } from '../../hooks/useViewportSize';
import styles from './ProjectsComponent.module.css';



const ProjectsComponent: React.FC = () => {
    const viewportSize = useViewportSize();

    const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
    const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
    const projectRefs = useRef<HTMLDivElement[]>([]);
    const headingRef = useRef<HTMLDivElement>(null);

    const handleReadFullDescription = (event: React.MouseEvent, index: number) => {
        event.stopPropagation();  // Stop propagation to the parent onClick
        if (!expandedProjects.includes(index)) {
            setExpandedProjects([...expandedProjects, index]);
        } else {
            setExpandedProjects(expandedProjects.filter((item) => item !== index));
        }
    };

    const handleShowAllBlogs = (e: any) => {
        e.stopPropagation();
        setShowAllProjects(!showAllProjects);
    };

    const handleScroll = () => {
        projectRefs.current.forEach((project) => {
            let rect: DOMRect = project?.getBoundingClientRect() || new DOMRect();
            const windowHeight = viewportSize.height;

            if (viewportSize.width < 600) {
                if (project)
                    project.style.opacity = '1';
            } else {
                if (rect.top < windowHeight && rect.bottom >= 0) {
                    const visibility = 1 - Math.max(0, (windowHeight + rect.top - 1450) / windowHeight);
                    if (project)
                        project.style.opacity = visibility.toString();
                } else {
                    if (project)
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
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            projectRefs.current.forEach((project) => {
                if (project) {
                    observer.unobserve(project);
                }
            });
            if (headingRef.current) {
                observer.unobserve(headingRef.current);
            }
        };
    }, [viewportSize.width]);

    return (
        <div className={styles.container}>
            <div className={styles.projectContainer}>
                {projects.slice().reverse().map((project, index) => (
                    (showAllProjects || index < 3) && (
                        <Link
                            key={index}
                            to={`/projects/${encodeURIComponent(project.title)}`}
                            className={`${styles.projectPreview} ${styles.fadeIn}`}
                        >
                            <div
                                ref={(el) => (projectRefs.current[index] = el as HTMLDivElement)}
                            >
                                <img src={project.images.thumbnail} alt={project.title} className={styles.image} loading='lazy' />
                                <h2 className={styles.projectTitle}>{project.title}</h2>
                                <p className={styles.description}>
                                    {expandedProjects.includes(index) ? project.description : project.description.substring(0, 100)}
                                    {project.description.length > 100 && (
                                        <button
                                            className={`${styles.readMoreButton} ${expandedProjects.includes(index) ? styles.readLessActive : ''}`}
                                            onClick={(event) => {
                                                event.stopPropagation(); // Stop the event from bubbling to the parent
                                                event.preventDefault();  // Prevent the Link navigation
                                                handleReadFullDescription(event, index); // Trigger the description toggle
                                            }}
                                        >
                                            {expandedProjects.includes(index) ? '...Read less' : '...Read more'}
                                        </button>
                                    )}
                                </p>

                                {/* Date Section */}
                                {viewportSize.width > 1084 && (
                                    <div className={styles.dateContainer}>
                                        <p className={`${styles.dateItem} ${styles.started}`}>
                                            Started: {project.date?.started ?? 'N/A'}
                                        </p>
                                        <div className={styles.separator}></div>
                                        <p className={`${styles.dateItem} ${styles.completed}`}>
                                            Completed: {project.date?.completed ?? 'N/A'}
                                        </p>
                                        <div className={styles.separator}></div>
                                        <p className={`${styles.dateItem} ${styles.lastUpdated}`}>
                                            Last Updated: {project.date?.lastUpdated ?? 'N/A'}
                                        </p>
                                    </div>
                                )}

                                <div className={styles.languagesLinksContainer}>
                                    <div className={styles.languagesLinksContainerLeft}>
                                        <h4 className={styles.languageHeader}>Languages/Frameworks</h4>

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
                                                    case 'Typescript':
                                                        topicClass = styles.typescript;
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
                                                    case 'Foundry':
                                                        frameworkClass = styles.foundry;
                                                        break;
                                                    case 'Ethers.js':
                                                        frameworkClass = styles.ethers;
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
                                    </div>
                                    {viewportSize.width > 835 ? (
                                        <div className={styles.linkContainer}>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    window.open(project.links[0].url, "_blank");
                                                }}
                                                className={styles.visitSite}
                                                rel="noopener noreferrer"
                                            >
                                                Visit
                                                <ExternalLink />
                                            </div>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    window.open(project.links[1].url, "_blank");
                                                }}
                                                className={styles.sourceCode}
                                                rel="noopener noreferrer"
                                            >
                                                Source <Github />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.linkContainer}>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    window.open(project.links[0].url, "_blank");
                                                }}
                                                className={styles.visitSite}
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink />
                                            </div>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    window.open(project.links[1].url, "_blank");
                                                }}
                                                className={styles.sourceCode}
                                                rel="noopener noreferrer"
                                            >
                                                <Github />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    )
                ))}

                {viewportSize.width > 738 && (
                    <div className={styles.buttonContainer}>
                        {!showAllProjects ? (
                            <ArrowRight
                                className={styles.arrowLeftRight}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleShowAllBlogs(e);
                                }}
                            />
                        ) : (
                            <ArrowLeft
                                className={styles.arrowLeftRight}
                                onClick={handleShowAllBlogs}
                            />
                        )}
                    </div>
                )}

                {viewportSize.width <= 738 && (
                    <div className={styles.buttonContainer}>
                        {!showAllProjects ? (
                            <button
                                className={styles.viewProjects}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleShowAllBlogs(e);
                                }}
                            >
                                View More...
                            </button>
                        ) : (
                            <button className={styles.hideProjects} onClick={handleShowAllBlogs}>
                                View Less
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsComponent;