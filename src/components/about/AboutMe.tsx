import styles from "./About.module.css";
export const AboutMe: React.FC = () => {
    return (
        <section className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <p className={styles.introParagraph}>
                Hi, I'm Trevor. I’m passionate about coding, with a special focus on smart contracts. I have hands-on experience using Foundry for writing and testing contracts, and I’m comfortable leveraging React to build intuitive front-end interfaces (like the one you're currently viewing—this portfolio was built from scratch using React). For seamless blockchain integration, I rely on Ethers.js as my go-to library. I specialize in developing efficient decentralized applications (dApps) that work flawlessly across EVM blockchains.
            </p>
            <p className={styles.introParagraph}>
                My expertise lies in Solidity, where I focus on secure and reliable contract development. I also enjoy crafting intuitive user interfaces that connect blockchain networks with React and Ethers.js. I’m always eager to collaborate on innovative Web3 projects that push the boundaries of decentralization.
            </p>
            <p className={styles.introParagraph}>
                Continuously exploring new tools and technologies, I strive to stay on the cutting edge of blockchain development. I’m excited to contribute to the ongoing evolution of the decentralized web.
            </p>
        </section>
    )
}