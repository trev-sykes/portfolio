import { useState, useEffect, useRef } from 'react';
import styles from './About.module.css';
export default function About() {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleReSize = () => {
        setViewportWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleReSize);
        return () => {
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
                    Hello, I’m Trevor Sykes. As a blockchain developer with a passion for decentralized technologies, I’m focused on creating innovative solutions that empower users and transform industries. With over two years of experience in developing smart contracts on the Ethereum network, I specialize in building secure, scalable decentralized applications (dApps).
                </p>
                <p className={styles.introParagraph}>
                    My expertise spans across Solidity for secure contract development, and I am highly skilled in integrating blockchain networks with user-friendly interfaces using React and Web3.js. I’m always seeking to collaborate on cutting-edge projects that push the limits of what’s possible in the Web3 space.
                </p>
                <p className={styles.introParagraph}>
                    I’m continuously exploring new tools and technologies to stay ahead of the curve, and I am eager to contribute to the growth of the decentralized web.
                </p>
            </div>

            <div className={styles.contentSection}>
                <h2 className={styles.sectionTitle}>Skills</h2>

                <section className={styles.skillsSection}>
                    <h3 className={styles.skillCategoryTitle}>Languages</h3>
                    <ul className={styles.skillsList}>
                        <li><div className={styles.strong}>JavaScript</div> (2 years) - Proficient in building dynamic web applications and working with APIs.</li>
                        <li><div className={styles.strong}>Solidity</div> (2 years) - Experienced in developing smart contracts for decentralized applications (dApps).</li>
                    </ul>
                </section>

                <section className={styles.skillsSection}>
                    <h3 className={styles.skillCategoryTitle}>Frameworks & Libraries</h3>
                    <h4 className={styles.frameworkTitle}>JavaScript</h4>
                    <ul className={styles.skillsList}>
                        <li><div className={styles.strong}>Web3.js</div> - Expertise in integrating with blockchain networks for decentralized applications.</li>
                        <li><div className={styles.strong}>React</div> - Strong experience in building interactive user interfaces and integrating blockchain components.</li>
                    </ul>

                    <h4 className={styles.frameworkTitle}>Solidity</h4>
                    <ul className={styles.skillsList}>
                        <li><div className={styles.strong}>Foundry</div> - Skilled in writing, testing, and deploying smart contracts across Ethereum-based blockchains.</li>
                    </ul>
                </section>
            </div>

            <div className={styles.contentSection}>
                <h2 className={styles.sectionTitle}>Goals</h2>
                <p className={styles.introParagraph}>
                    I’m excited about the transformative potential of Web3 and blockchain to create a more open, secure, and user-centric internet. My goal is to work alongside forward-thinking teams to build decentralized applications that enable new use cases, empower individuals, and enhance trust in the digital world.
                </p>
            </div>
        </div>
    );
}
