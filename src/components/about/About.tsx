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
                    I'm a passionate blockchain developer with a focus on creating innovative, decentralized solutions. With over two years of hands-on experience in blockchain technology, I specialize in developing and deploying smart contract systems on the Ethereum Virtual Machine (EVM). I thrive on the challenge of bridging the gap between frontend applications and blockchain networks, using Web3.js and React to build seamless and interactive decentralized applications (dApps).
                </p>
                <p className={styles.introParagraph}>
                    My journey started with a curiosity for decentralized technologies and their potential to revolutionize industries. Over time, I’ve honed my skills in Solidity, gaining expertise in writing secure and efficient smart contracts. I also have a strong background in integrating blockchain solutions with modern frontend technologies, ensuring users experience smooth and intuitive interactions with decentralized platforms.
                </p>
                <p className={styles.introParagraph}>
                    I’m always learning and staying ahead of the curve with new tools, libraries, and frameworks that empower the Web3 ecosystem. My mission is to contribute to the growth of decentralized web technologies and help bring real-world use cases to life through blockchain.
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
                        <li><div className={styles.strong}>Web3.js</div> - Expertise in integrating with blockchain networks for decentralized web (dWeb) applications.</li>
                        <li><div className={styles.strong}>React</div> - Strong experience in building interactive user interfaces, integrating with blockchain components.</li>
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
                    I'm driven by the transformative potential of blockchain technology and its ability to create more transparent, efficient, and accessible systems. Through my work, I aim to contribute to the evolution of Web3 infrastructure while making decentralized solutions more approachable for everyday users.
                </p>
            </div>
        </div>
    );
}