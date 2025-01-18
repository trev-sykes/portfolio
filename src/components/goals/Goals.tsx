import styles from "../about/About.module.css";
export const Goals: React.FC = () => {
    return (
        <section className={`${styles.contentSection} ${styles.goals}`}>
            <h2 className={styles.sectionTitle}>Goals</h2>
            <p className={styles.introParagraph}>
                I’m excited about the transformative potential of Web3 and blockchain to create a more open, secure, and user-centric internet. My goal is to work alongside forward-thinking teams to build decentralized applications and infastructures that enable new use cases, empower individuals, and enhance trust in the digital world.
            </p>
        </section>
    )
}