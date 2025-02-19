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
            {title.toLocaleLowerCase().trim() == 'projects' && < div className={`${styles.divider} ${styles.projectDivider}`} ></div>}
            {title.toLocaleLowerCase().trim() == 'blogs' && < div className={`${styles.divider} ${styles.projectDivider}`} ></div>}
        </div >
    )
}
export default HeroTitle;