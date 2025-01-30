import styles from './HeroTitle.module.css';
interface HeroTitleProps {
    title: string;
}
const HeroTitle: React.FC<HeroTitleProps> = ({ title }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {title}
            </h1>
            <div className={styles.divider} ></div>
        </div>
    )
}
export default HeroTitle;