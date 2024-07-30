import { useState, useEffect, useRef } from 'react';
import { projects } from './projects'; // Import your projects data
import styles from './ProjectsComponent.module.css';
import ProjectFullPage from './ProjectsFullPage';

const ProjectsComponent = () => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [showFullPage, setShowFullPage] = useState<boolean>(false);
    const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
    const [typewriterStarted, setTypewriterStarted] = useState<boolean>(false); // State to control Typewriter start
    const projectRefs = useRef<HTMLDivElement[]>([]); // To store references to project preview elements
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1, // Trigger when 10% of the element is visible
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add(styles.fadeInVisible);
                    }, 300);
                    setTypewriterStarted(true); // Trigger Typewriter start
                } else {
                    entry.target.classList.remove(styles.fadeInVisible);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        projectRefs.current.forEach((project) => {
            observer.observe(project);
        });

        return () => {
            projectRefs.current.forEach((project) => {
                observer.unobserve(project);
            });
            if (headingRef.current) {
                observer.unobserve(headingRef.current);
            }
        };
    }, []);

    const handleReadFullDescription = (index: number) => {
        if (!expandedProjects.includes(index)) {
            setExpandedProjects([...expandedProjects, index]);
        } else {
            setExpandedProjects(expandedProjects.filter((item) => item !== index));
        }
    };

    const handleReadFullProject = (index: number) => {
        setSelectedProject(index);
        setShowFullPage(true); // Show full-page project when "Read full project" is clicked

        // Scroll to the top of the full project post
        const fullProjectPost = document.getElementById(`project-${index}`);
        if (fullProjectPost) {
            fullProjectPost.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleCloseFullView = () => {
        setSelectedProject(null);
        setShowFullPage(false); // Hide full-page project
    };

    return (
        <>
            <div className={`${styles.projects} ${typewriterStarted ? styles.fadeInVisible : ''}`}>
                <h1 ref={headingRef}>
                    {/* Typewriter effect can be added here if needed */}
                    Projects
                </h1>
            </div>

            <div className={styles.container}>
                {!showFullPage && (
                    <div className={styles.projectContainer}>
                        {projects.slice().reverse().map((project, index) => (
                            <div
                                key={index}
                                className={`${styles.projectPreview} ${styles.fadeIn}`}
                                ref={(el) => (projectRefs.current[index] = el as HTMLDivElement)}
                            >
                                <img src={project.imageUrl} alt={project.title} className={styles.image} />
                                <h2>{project.title}</h2>
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
                                <div className={styles.topics}>
                                    {project.topic.map((topic, topicIndex) => {
                                        let topicClass = '';
                                        switch (topic) {
                                            // Add cases for your topics
                                            default:
                                                topicClass = '';
                                        }
                                        return (
                                            <span key={topicIndex} className={`${styles.topic} ${topicClass}`}>
                                                {topic}
                                            </span>
                                        );
                                    })}
                                </div>
                                <button
                                    className={styles.readFullProjectButton}
                                    onClick={() => handleReadFullProject(projects.length - index - 1)}
                                >
                                    Read full project
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {selectedProject !== null && showFullPage && (
                    <ProjectFullPage selectedProject={selectedProject} onClose={handleCloseFullView} />
                )}
            </div>
        </>
    );
};

export default ProjectsComponent;
