import React, { useEffect } from 'react';
import styles from './ProjectsFullPage.module.css'; // Ensure this file exists and contains correct styles
import { projects } from './projects';

interface ProjectFullPageProps {
  selectedProject: number | null;
  onClose: () => void;
}

const ProjectFullPage: React.FC<ProjectFullPageProps> = ({ selectedProject, onClose }) => {
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.stopPropagation();
    };

    document.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleScroll);
    };
  }, []);

  if (selectedProject === null) {
    return null;
  }

  const project = projects[selectedProject];
  return (
    <div className={styles.fullPage}>
      <button className={styles.closeButton} onClick={onClose}>Close</button>
      <h1>{project.title}</h1>
      <div className={styles.image} style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
      <p>{project.description}</p>
      <p>{project.date}</p>
      <div className={styles.topics}>
        {project.topic.map((topic, index) => (
          <span key={index} className={styles.topic}>{topic}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectFullPage;
