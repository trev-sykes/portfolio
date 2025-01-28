import styles from "./About.module.css";
export const AboutMeHeader: React.FC = () => {
    return (
        <header className={styles.headerContainer}>
            <h1 className={styles.title}>Portfolio</h1>
            <div className={styles.divider}></div>
        </header>
    )
}