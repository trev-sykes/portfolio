import { useRef } from 'react';
import Projects from "../projects/ProjectsComponent";
import styles from './About.module.css';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const skillsSectionRef = useRef<HTMLDivElement>(null);



    return (
        <div className={styles.container} ref={containerRef}>

            <header className={styles.headerContainer}>
                <h1 className={styles.title}>Trevor Sykes</h1>
                <div className={styles.divider}></div>
            </header>

            <section className={styles.contentSection}>
                <h2 className={styles.sectionTitle}>About Me</h2>
                <p className={styles.introParagraph}>
                    Hi, I’m Trevor Sykes. I’m passionate about coding, with a special focus on smart contracts. I have hands-on experience using Foundry for writing and testing contracts, and I’m comfortable leveraging React to build intuitive front-end interfaces (like the one you're currently viewing—this portfolio was built from scratch using React). For seamless blockchain integration, I rely on Ethers.js as my go-to library. I specialize in developing efficient decentralized applications (dApps) that work flawlessly across EVM blockchains.
                </p>
                <p className={styles.introParagraph}>
                    My expertise lies in Solidity, where I focus on secure and reliable contract development. I also enjoy crafting intuitive user interfaces that connect blockchain networks with React and Ethers.js. I’m always eager to collaborate on innovative Web3 projects that push the boundaries of decentralization.
                </p>
                <p className={styles.introParagraph}>
                    Continuously exploring new tools and technologies, I strive to stay on the cutting edge of blockchain development. I’m excited to contribute to the ongoing evolution of the decentralized web.
                </p>
            </section>

            <Projects />

            <section ref={skillsSectionRef} className={`${styles.contentSection} ${styles.skills}`}>
                <h2 className={styles.sectionTitle}>
                    Skills
                </h2>

                <section className={styles.skillsSection}>
                    <h3 className={styles.skillCategoryTitle}>Languages</h3>
                    <ul className={styles.skillsList}>
                        <li>
                            <div className={styles.strong}>
                                <div className={styles.strong}>
                                    JavaScript
                                </div>
                            </div>
                            (2 years) - Proficient in building dynamic web applications and working with APIs.
                        </li>
                        <li>
                            <div className={styles.strong}>
                                Solidity
                            </div>
                            (2 years) - Experienced in developing smart contracts for decentralized applications (dApps).
                        </li>
                    </ul>
                </section>

                <section className={styles.skillsSection}>
                    <h3 className={styles.skillCategoryTitle}>Frameworks & Libraries</h3>
                    <h4 className={styles.frameworkTitle}>JavaScript</h4>
                    <ul className={styles.skillsList}>
                        <li>
                            <div className={styles.strong}>
                                Ethers.js, Web3.js
                            </div>
                            - Expertise in integrating with blockchain networks for decentralized applications.
                        </li>
                        <li>
                            <div className={styles.strong}>
                                React
                            </div>
                            - Strong experience in building interactive user interfaces and integrating blockchain components.
                        </li>
                    </ul>

                    <h4 className={styles.frameworkTitle}>Solidity</h4>
                    <ul className={styles.skillsList}>
                        <li>
                            <div className={styles.strong}>
                                Foundry
                            </div>
                            - Skilled in writing, testing, and deploying smart contracts across Ethereum-based blockchains.
                        </li>
                    </ul>
                </section>
            </section>

            <section className={`${styles.contentSection} ${styles.goals}`}>
                <h2 className={styles.sectionTitle}>Goals</h2>
                <p className={styles.introParagraph}>
                    I’m excited about the transformative potential of Web3 and blockchain to create a more open, secure, and user-centric internet. My goal is to work alongside forward-thinking teams to build decentralized applications that enable new use cases, empower individuals, and enhance trust in the digital world.
                </p>
            </section>

        </div>
    );
}
