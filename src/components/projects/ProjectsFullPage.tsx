import React, { useEffect } from 'react';
import styles from './ProjectsFullPage.module.css';
import { Minimize2 } from 'lucide-react';
import { projects } from './project';

interface Props {
  selectedProject: number | null;  // Changed from selectedBlog to match parent component
  onClose: () => void;
}

const ProjectFullPage: React.FC<Props> = ({ selectedProject, onClose }) => {
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.stopPropagation();
    };

    document.addEventListener('wheel', handleScroll, { passive: false });
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('wheel', handleScroll);
      document.body.style.overflow = ''; // Restore scrolling on unmount
    };
  }, []);

  if (selectedProject === null) {
    return null;
  }

  const project = projects[selectedProject];

  if (!project) {
    return null; // Add safety check for undefined project
  }

  return (
    <div id={`project-${selectedProject}`} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.titleHeader}>{project.title}</h1>
        <Minimize2
          className={styles.min}
          strokeWidth={3}
          onClick={onClose}
          size={24}
        />
      </div>

      <div className={styles.content}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        />

        <p className={styles.date}>Published on {project.date}</p>

        <p className={styles.description}>{project.description}</p>

        {/* Tech Stack Section */}
        <div className={styles.techStack}>
          <h3>Technologies Used:</h3>
          <ul>
            {project.techStack?.languages?.length > 0 && (
              <li><strong>Languages:</strong> {project.techStack.languages.join(', ')}</li>
            )}
            {project.techStack?.frameworks?.length > 0 && (
              <li><strong>Frameworks:</strong> {project.techStack.frameworks.join(', ')}</li>
            )}
          </ul>
        </div>
        {/* Dependencies */}
        <div className={styles.techStack}>
          <h2>Dependencies</h2>
          <ul>
            {project.dependencies?.length > 0 && (
              <li><strong>{project.dependencies.map(dep => dep.name).join(", ")}</strong><span>{project.dependencies.map(dep => dep.description).join(" ")}</span></li>

            )}

          </ul>
        </div>

        {/* Project Overview Section */}
        {project.summary && (
          <div className={styles.summary}>
            <h2>Project Overview</h2>
            <p>{project.summary}</p>
          </div>
        )}

        {/* Inspiration Section */}
        {project.inspiration && (
          <div className={styles.inspiration}>
            <h2>Inspiration</h2>
            <p>{project.inspiration}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFullPage;