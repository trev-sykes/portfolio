import React from 'react';
import styles from './ProjectsFullPage.module.css'; // Create appropriate CSS module
import { projects } from './projects';

interface ProjectFullPageProps {
  selectedProject: number;
  onClose: () => void;
}

const ProjectFullPage: React.FC<ProjectFullPageProps> = ({ selectedProject, onClose }) => {
  const project = projects[selectedProject]; // Assuming projects array is accessible

  return (
    <div className={styles.fullPage}>
      <button className={styles.closeButton} onClick={onClose}>Close</button>
      <h1>{project.title}</h1>
      <img src={project.imageUrl} alt={project.title} className={styles.fullImage} />
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
