import React, { useEffect } from 'react';
import styles from './ProjectsFullPage.module.css'; // Ensure this file exists and contains correct styles
import { projects } from './project/index';

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
    <div className={styles.container}>
      <div className={styles.fullPage}>
        <div className={styles.header}>
          <h1>{project.title}</h1>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
        <p className={styles.date}>{project.date}</p>
        <div className={styles.image} style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
        <p>{project.summary}</p>
      </div>
    </div>
  );
};

export default ProjectFullPage;
