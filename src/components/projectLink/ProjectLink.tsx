import { useState, useEffect } from 'react';
import { useWindowScroll } from '../../hooks/useWindowScroll';
import { ExternalLink } from 'lucide-react';
import styles from './ProjectLink.module.css';
interface ProjectLinkProps {
    projectUrl: any;

}
const ProjectLink: React.FC<ProjectLinkProps> = ({ projectUrl }) => {
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
            setIsFixed(scrollY > 475);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);

    return (
        <>
            <div
                className={`${styles.container} ${isFixed ? styles.fixed : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a href={projectUrl} target="_blank" ><ExternalLink className={styles.externalLink} size={40} style={{ color: isHovered ? 'white' : '' }} /></a>
            </div>
        </>
    );
}


export default ProjectLink;