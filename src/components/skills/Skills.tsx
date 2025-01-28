import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from './Skills.module.css';

export default function Skills() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <section className={styles.hero}>
                    <h1 className={styles.name}>Trevor Sykes</h1>
                    <h2 className={styles.title}>DApp Developer & DeFi Architect</h2>

                    <p className={styles.introParagraph}>
                        I'm passionate about coding, with a special focus on smart contracts and blockchain development. With hands-on experience in Foundry for writing and testing contracts, I create seamless decentralized applications that bridge the gap between users and blockchain technology.
                    </p>

                    <p className={styles.introParagraph}>
                        My expertise in Solidity drives the development of secure and reliable smart contracts, while my proficiency with React and Ethers.js enables me to craft intuitive user interfaces that connect seamlessly with blockchain networks.
                    </p>

                    <div className={styles.links}>
                        <a href="https://ethereum.org/en/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                            Ethereum
                        </a>
                        <a href="https://github.com/trev-sykes" target="_blank" rel="noopener noreferrer" className={styles.link}>
                            GitHub
                        </a>
                    </div>
                </section>

                <div className={styles.skillsContainer}>
                    <section className={styles.skillSection}>
                        <h3 className={styles.skillCategory}>Languages</h3>
                        <div className={styles.skillGrid}>
                            <div className={styles.skillCard}>
                                <span className={styles.experienceTag}>2 years experience</span>
                                <h4 className={styles.skillName}>JavaScript</h4>
                                <p className={styles.skillDescription}>
                                    Proficient in building dynamic web applications and working with APIs. Extensive experience in developing Front-end interfaces with React, traditional HTML/CSS, and integrating data from various APIs.
                                </p>
                            </div>

                            <div className={styles.skillCard}>
                                <span className={styles.experienceTag}>2 years experience</span>
                                <h4 className={styles.skillName}>Solidity</h4>
                                <p className={styles.skillDescription}>
                                    Specialized in smart contract development for dApps, with expertise in on-chain game economics, DeFi architectures, social graphs, and NFT creation.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.skillSection}>
                        <h3 className={styles.skillCategory}>Frameworks & Libraries</h3>
                        <div className={styles.skillGrid}>
                            <div className={styles.skillCard}>
                                <h4 className={styles.skillName}>Ethers.js & Web3.js</h4>
                                <p className={styles.skillDescription}>
                                    Expert integration with EVM-compatible blockchain networks for decentralized applications.
                                </p>
                            </div>

                            <div className={styles.skillCard}>
                                <h4 className={styles.skillName}>React</h4>
                                <p className={styles.skillDescription}>
                                    Skilled in building responsive and interactive Front-end interfaces with modern React practices.
                                </p>
                            </div>

                            <div className={styles.skillCard}>
                                <h4 className={styles.skillName}>Foundry</h4>
                                <p className={styles.skillDescription}>
                                    Advanced proficiency in writing, testing, and deploying smart contracts across Ethereum-based blockchains.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer copyrightText="Trevor Sykes - 2025" />
            </div>
        </>
    );
}