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
            if (viewportWidth > 800) {
                const speedFactor = .4; // Adjust this value to control the speed of the opacity change
                const opacity = 1 - (Math.max(0, (windowHeight - rect.top - 1000) / (windowHeight * speedFactor)));
                container.style.opacity = opacity.toString();
            } else {
                const speedFactor = .8; // Adjust this value to control the speed of the opacity change
                const opacity = 1 - (Math.max(0, (windowHeight - rect.top - 20000) / (windowHeight * speedFactor)));
                container.style.opacity = opacity.toString();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call to set opacity based on current scroll position
        window.addEventListener('resize', handleReSize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <h1 className={styles.title}>
                Trevor Sykes
            </h1>
            <p className={styles.introParagraph}>
                I'm a Smart Contract Developer and Blockchain Engineer passionate about building the future of decentralized technology. With a focus on innovative solutions and secure implementations, I specialize in developing robust blockchain applications that bridge the gap between traditional and Web3 technologies.
            </p>
            <br />
            <p className={styles.introParagraph}>
                My technical expertise includes two years of Solidity development, creating and auditing smart contracts for various blockchain platforms. I complement this with two years of frontend development experience, leveraging React.js to build intuitive user interfaces. My strong foundation in vanilla CSS ensures clean, responsive designs that enhance user experience.
            </p>
            <br />
            <p className={styles.introParagraph}>
                I'm driven by the transformative potential of blockchain technology and its ability to create more transparent, efficient, and accessible systems. Through my work, I aim to contribute to the evolution of Web3 infrastructure while making decentralized solutions more approachable for everyday users.
            </p>
        </div>
    );
}
