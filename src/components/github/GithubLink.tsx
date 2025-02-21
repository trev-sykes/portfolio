import { useState, useEffect } from 'react';
import { useWindowScroll } from '../../hooks/useWindowScroll';
import styles from './GithubLink.module.css';
interface GithubLinkProps {
  projectUrl?: string;
}
const GithubLink: React.FC<GithubLinkProps> = ({ projectUrl }) => {
  const { scrollPosition } = useWindowScroll();
  const [isHovered, setIsHovered] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = scrollPosition.y;
      setIsFixed(scrollY > 445);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <>
      <div
        className={`${styles.githubContainer} ${isFixed ? styles.fixed : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          className={styles.githubLink}
          href={projectUrl ? projectUrl : `https://www.github.com/trev-sykes`}
          target="_blank"
          rel="noreferrer"
        >
          <svg
            className={styles.githubSvg}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ stroke: isHovered ? 'rgb(255,255,255)' : 'rgb(245, 245, 245)' }} // Change 'red' to the color you want on hover
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.74-2.51.46-3.04-1.21-3.04-1.21-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.91.06 1.39.94 1.39.94.81 1.39 2.13.99 2.65.76.08-.59.31-.99.57-1.22-1.99-.22-4.1-1-4.1-4.45 0-1 .35-1.82.94-2.47-.09-.22-.41-1.17.09-2.44 0 0 .77-.25 2.5.94.72-.20 1.49-.30 2.26-.30.77 0 1.54.10 2.26.30 1.73-1.19 2.5-.94 2.5-.94.5 1.27.18 2.22.09 2.44.59.65.94 1.47.94 2.47 0 3.46-2.12 4.23-4.14 4.45.32.28.62.83.62 1.67 0 1.21-.01 2.19-.01 2.48 0 .27.18.58.69.48A10.015 10.015 0 0022 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </a>
      </div>
    </>
  );
}

export default GithubLink;