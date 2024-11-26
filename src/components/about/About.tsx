import { useState, useEffect, useRef } from 'react';
import styles from './About.module.css';

export default function About() {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleReSize = () => {
        setViewportWidth(window.innerWidth);
    }

    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // More nuanced opacity calculation
            const speedFactor = viewportWidth > 800 ? 0.4 : 0.8;
            const opacityOffset = viewportWidth > 800 ? 1000 : 20000;

            const opacity = 1 - (Math.max(0, (windowHeight - rect.top - opacityOffset) / (windowHeight * speedFactor)));
            container.style.opacity = opacity.toString();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleReSize);

        // Initial call to set opacity
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleReSize);
        };
    }, [viewportWidth]);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.headerContainer}>
                <h1 className={styles.title}>Trevor Sykes</h1>
                <div className={styles.divider}></div>
            </div>

            <div className={styles.contentSection}>
                <h2 className={styles.sectionTitle}>About Me</h2>
                <p className={styles.introParagraph}>
                    I'm a Smart Contract Developer and Blockchain Engineer passionate about building the future of decentralized technology. With a focus on innovative solutions and secure implementations, I specialize in developing robust blockchain applications that bridge the gap between traditional and Web3 technologies.
                </p>
            </div>

            <div className={styles.contentSection}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                <p className={styles.introParagraph}>
                    My technical expertise includes two years of Solidity development, creating and auditing smart contracts for various blockchain platforms. I complement this with two years of frontend development experience, leveraging React.js to build intuitive user interfaces. My strong foundation in vanilla CSS ensures clean, responsive designs that enhance user experience.
                </p>
            </div>

            <div className={styles.contentSection}>
                <h2 className={styles.sectionTitle}>Goals</h2>
                <p className={styles.introParagraph}>
                    I'm driven by the transformative potential of blockchain technology and its ability to create more transparent, efficient, and accessible systems. Through my work, I aim to contribute to the evolution of Web3 infrastructure while making decentralized solutions more approachable for everyday users.
                </p>
            </div>
        </div>
    );
}