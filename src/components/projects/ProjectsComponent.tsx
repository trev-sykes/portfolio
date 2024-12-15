import { useState, useRef, useEffect } from 'react';
import { projects } from './project';
import ProjectFullPage from './ProjectsFullPage';
import styles from './ProjectsComponent.module.css';

const ProjectsComponent = () => {
    const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [showAllBlogs, setShowAllBlog] = useState<boolean>(false);
    const [showFullPage, setShowFullPage] = useState<boolean>(false);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const [animatingProject, setAnimatingProject] = useState<number | null>(null);
    const [typewriterStarted, setTypewriterStarted] = useState<boolean>(false);
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
        setAnimatingProject(null);
        setShowFullPage(false);
        document.body.style.overflow = '';
    };
    const handleResize = () => {
        setViewportWidth(window.innerWidth);
    };
    const handleShowAllBlogs = () => {
        if (showAllBlogs)
            setShowAllBlog(false);
        else
            setShowAllBlog(true);

    }
    useEffect(() => {

    }, [showAllBlogs])
    const handleScroll = () => {
        typewriterStarted;
        projectRefs.current.forEach((blog) => {
            let rect: DOMRect = {
                x: 146,
                y: 50,
                width: 440,
                height: 240,
                top: 50,
                right: 586,
                bottom: 290,
                left: 146,
                toJSON: () => ({
                    x: 146,
                    y: 50,
                    width: 440,
                    height: 240,
                    top: 50,
                    right: 586,
                    bottom: 290,
                    left: 146
                }),
            };
            if (blog) {
                rect = blog.getBoundingClientRect();
            }

            const windowHeight = window.innerHeight;

            if (viewportWidth < 600) {
                if (blog) {
                    blog.style.opacity = '1';
                }
            } else {
                if (rect.top < windowHeight && rect.bottom >= 0) {
                    const visibility = 1 - Math.max(0, (windowHeight + rect.top - 1450) / windowHeight);
                    if (blog) {
                        blog.style.opacity = visibility.toString();
                    }
                } else {
                    if (blog) {
                        blog.style.opacity = '0';
                    }
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
                        setTypewriterStarted(true);
                    }, 300);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        projectRefs.current.forEach((blog) => {
            if (blog) {
                observer.observe(blog);
            }
        });

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            projectRefs.current.forEach((blog) => {
                if (blog) {
                    observer.unobserve(blog);
                }
            });
            if (headingRef.current) {
                observer.unobserve(headingRef.current);
            }
        };
    }, [viewportWidth]);

    animatingProject;
    return (
        <>
            <div className={`${styles.projects}`}>
                <h1 ref={headingRef}>
                    {/* Typewriter effect can be added here if needed */}
                    Top Projects
                </h1>
            </div>

            <div className={styles.container}>
                {(
                    <div className={styles.projectContainer}>
                        {projects.slice().reverse().map((project, index) => (
                            (showAllBlogs || index < 2) && (
                                <div
                                    key={index}
                                    className={`${styles.projectPreview} ${styles.fadeIn}`}
                                    ref={(el) => (projectRefs.current[index] = el as HTMLDivElement)}
                                >
                                    <img src={project.imageUrl} alt={project.title} className={styles.image} loading='lazy' />
                                    <h2 className={styles.projectTitle}>{project.title}</h2>
                                    <p>
                                        {expandedProjects.includes(index) ? project.description : project.description.substring(0, 100)}
                                        {project.description.length > 100 && (
                                            <button
                                                aria-expanded={expandedProjects.includes(index)}
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
                                        {/* <button
                                        className={styles.readFullArticleButton}
                                        onClick={() => handleReadFullArticle(projects.length - index - 1)}
                                    >
                                        Project Details
                                    </button> */}
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
                        {!showAllBlogs ? (
                            <>
                                <button className={styles.viewProjects} onClick={handleShowAllBlogs}>View More</button>
                            </>
                        ) : (
                            <>
                                <button className={`${styles.viewProjects} ${styles.viewLess}`} onClick={handleShowAllBlogs}>View Less</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProjectsComponent;
