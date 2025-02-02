import { useState, useRef, useEffect } from 'react';
import { projects } from './project';
import styles from './ProjectsComponent.module.css';
import { Maximize2, ExternalLink, Github, } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectsCompnentProps {
    section: string;
}

const ProjectsComponent: React.FC<ProjectsCompnentProps> = ({ section }) => {

    const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
    const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const projectRefs = useRef<HTMLDivElement[]>([]);
    const headingRef = useRef<HTMLDivElement>(null);


    const handleReadFullDescription = (index: number) => {
        if (!expandedProjects.includes(index)) {
            setExpandedProjects([...expandedProjects, index]);
        } else {
            setExpandedProjects(expandedProjects.filter((item) => item !== index));
        }
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

    return (
        <div className={styles.container}>
            {section == 'home' && (
                <div className={`${styles.projects} `}>
                    <h2 ref={headingRef}>Top Projects</h2>
                </div>
            )}
            {section == 'projects' && (
                <div className={`${styles.projects} `}>
                    <h2 ref={headingRef}></h2>
                </div>
            )}
            <div className={styles.projectContainer}>
                {projects.slice().reverse().map((project, index) => (
                    (showAllProjects || index < 3) && (
                        <div
                            key={index}
                            className={`${styles.projectPreview} ${styles.fadeIn} `}
                            ref={(el) => (projectRefs.current[index] = el as HTMLDivElement)}
                        >
                            <img src={project.images.thumbnail} alt={project.title} className={styles.image} loading='lazy' />
                            <h2 className={styles.projectTitle}>{project.title}</h2>
                            <p className={styles.description}>
                                {expandedProjects.includes(index) ? project.description : project.description.substring(0, 100)}
                                {project.description.length > 100 && (
                                    <button
                                        className={`${styles.readMoreButton} ${expandedProjects.includes(index) ? styles.readLessActive : ''} `}
                                        onClick={() => handleReadFullDescription(index)}
                                    >
                                        {expandedProjects.includes(index) ? '...Read less' : '...Read more'}
                                    </button>
                                )}
                            </p>

                            {/* Date Section */}
                            <div className={styles.dateContainer}>
                                <p className={`${styles.dateItem} ${styles.started} `}>
                                    Started: {project.date?.started ?? 'N/A'}
                                </p>
                                <div className={styles.separator}> </div>
                                <p className={`${styles.dateItem} ${styles.completed} `}>
                                    Completed: {project.date?.completed ?? 'N/A'}
                                </p>
                                <div className={styles.separator}> </div>
                                <p className={`${styles.dateItem} ${styles.lastUpdated} `}>
                                    Last Updated: {project.date?.lastUpdated ?? 'N/A'}
                                </p>
                            </div>
                            <div className={styles.languagesLinksContainer} >
                                <div>
                                    <h4 className={styles.languageHeader}>Languages/Frameworks</h4>

                                    {/* Safeguard for undefined techStack */}
                                    < div className={styles.topics} >
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
                                                <span key={topicIndex} className={`${styles.topic} ${topicClass} `}>
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
                                                <span key={topicIndex} className={`${styles.language} ${frameworkClass} `}>
                                                    {framework}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className={styles.linkContainer}>
                                    <Link
                                        to={`/projects/${encodeURIComponent(project.title)}`}  // Corrected path
                                        className={styles.readFullArticleButton}
                                    >
                                        Read
                                        <Maximize2 />
                                    </Link>
                                    <a
                                        href={project.links[0].url}
                                        className={styles.visitSite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Visit
                                        <ExternalLink
                                        />
                                    </a>
                                    <a
                                        href={project.links[1].url}
                                        className={styles.sourceCode}
                                        target='_blank'
                                        rel='noopen noreferrer'
                                    >Source<Github /></a>
                                </div>
                            </div>
                        </div>
                    )
                ))}
                {!showAllProjects ? (
                    <button className={styles.viewProjects} onClick={handleShowAllBlogs}>View More...</button>
                ) : (
                    <button className={`${styles.viewProjects} ${styles.viewLess} `} onClick={handleShowAllBlogs}>View Less</button>
                )}
            </div >
        </div >
    );
};

export default ProjectsComponent;
