import { useEffect, useRef } from 'react';
import styles from './About.module.css';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate opacity based on the element's visibility in the viewport
            const opacity = 1 - Math.max(0, (windowHeight - rect.top - 725) / windowHeight);
            container.style.opacity = opacity;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call to set opacity based on current scroll position

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <h1 className={styles.title}>
                Trevor Jacob Sykes
            </h1>
            <p className={styles.introParagraph}>
                Hi, I'm Trevor Sykes. I taught myself how to code, specializing in React and Solidity. Most of my skills come from working on my own projects, where I've grown to love using tech to make a difference.
            </p>
            <br />
            <p className={styles.introParagraph}>
                I'm excited to join a progressive company where I can use my skills on impactful projects. I specialize in front-end development and blockchain technology, aiming to create easy-to-use interfaces and find creative solutions to tough challenges.
            </p>
            <br />
            <p className={styles.introParagraph}>
                I'm motivated by using tech to help others, like making things easier or more accessible. I'm all in for using what I know to make an impact. I look forward to working with a team where I can share, learn, and grow.
            </p>
        </div>
    );
}
