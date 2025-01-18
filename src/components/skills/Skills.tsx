import styles from "../about/About.module.css";
interface SkillsProps {
    skillsSectionRef: any;
}
export const Skills: React.FC<SkillsProps> = ({ skillsSectionRef }) => {

    return (
        <section ref={skillsSectionRef} className={`${styles.contentSection} ${styles.skills}`}>
            <h2 className={styles.sectionTitle}>
                My Skills
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
                        <span>(2 years) - Proficient in building dynamic web applications and working with APIs. experience in building Front end interfaces with React as well as traditional HTML and CSS and fetching/rendering data onto interfaces from API's.</span>
                    </li>
                    <li>
                        <div className={styles.strong}>
                            Solidity
                        </div>
                        <span>(2 years) - Experienced in developing smart contracts for decentralized applications (dApps). Specific expertise in on-chain game economic architectures, creating reliable decentralized financial architecture infastructures, creating on-chain social graphs for user to user interactions, and much more. Hands on experience in creating NFT's.</span>
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
                        - Expertise in integrating with EVM compatable blockchain networks for decentralized applications.
                    </li>
                    <li>
                        <div className={styles.strong}>
                            React
                        </div>
                        - Experience in building Front end interfaces.
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

    )
}