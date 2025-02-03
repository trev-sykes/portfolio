import React, { useEffect } from 'react';
import styles from './ProjectsFullPage.module.css';
import { Minimize2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { projects } from './project'; // Assuming projects is an array containing your project data
import CodeBlockFormatter from '../codeBlockFormatter/CodeBlockFormatter';

const ProjectFullPage: React.FC = () => {
  // Extract the project name from the URL
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate(); // We can use navigate to go back if needed

  useEffect(() => {

    const handleScroll = (e: WheelEvent) => e.stopPropagation();
    document.addEventListener('wheel', handleScroll, { passive: false });
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('wheel', handleScroll);
      document.body.style.overflow = ''; // Restore scrolling on unmount
    };
  }, []);

  // Find the project based on the title in the URL
  const project = projects.find(
    (p) => {
      if (p.title == projectName)
        return encodeURIComponent(p.title == projectName)
    }
  );

  if (!project) return <div>Project not found</div>; // Handle case where project doesn't exist

  const handleClose = () => {
    navigate('/projects'); // Navigate back to the projects page when closed
  };

  return (
    <div id={`project-${project.title}`} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.titleHeader}>{project.title}</h1>
        <Minimize2 className={styles.min} strokeWidth={3} onClick={handleClose} size={24} />
      </div>

      <div className={styles.content}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${project.images.preview})` }}
        />

        {/* Render only the completed date */}
        <p className={styles.date}>
          Published on {project.date?.completed ? project.date.completed : 'N/A'}
        </p>

        <p className={styles.description}>{project.description}</p>

        {/* Tech Stack Section */}
        {project.techStack && (
          <div className={styles.techStack}>
            <h3>Technologies Used:</h3>
            <ul>
              {project.techStack.languages?.length > 0 && (
                <li><strong>Languages:</strong> {project.techStack.languages.join(', ')}</li>
              )}
              {project.techStack.frameworks?.length > 0 && (
                <li><strong>Frameworks:</strong> {project.techStack.frameworks.join(', ')}</li>
              )}
              {Array.isArray(project.techStack.tools) && project.techStack.tools.length > 0 && (
                <li><strong>Tools:</strong> {project.techStack.tools.join(', ')}</li>
              )}
              {Array.isArray(project.techStack.databases) && project.techStack.databases.length > 0 && (
                <li><strong>Databases:</strong> {project.techStack.databases.join(', ')}</li>
              )}
            </ul>
          </div>
        )}

        {/* Dependencies Section */}
        {project.dependencies?.length > 0 && (
          <div className={styles.techStack}>
            <h3>Dependencies</h3>
            <ul>
              {project.dependencies.map((dep, index) => (
                <li key={index} className={styles.dependencyItem}>
                  <div className={styles.dependencyName}><strong>{dep.name}</strong></div>
                  <div className={styles.dependencyDescription}>{dep.description}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

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

        {/* Code Blocks Section */}
        {project.codeBlocks?.length > 0 && (
          <div className={styles.codeBlocks}>
            <h3>Code Examples</h3>
            {project.codeBlocks.map((frag, index) => (
              <CodeBlockFormatter
                key={index}
                language={frag.language}
                code={frag.content}
              />
            ))}
          </div>
        )}

        {/* Learnings Section */}
        {project.learnings && project.learnings.length > 0 && (
          <div className={styles.learnings}>
            <h2>Learnings</h2>
            <ul>
              {project.learnings.map((frag, index) => (
                <li key={index}>{frag}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFullPage;
