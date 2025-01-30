import styles from './HomeIntro.module.css';
import { Link } from 'react-router-dom';
export const HomeIntro = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <p className={styles.text}>Hello World 👋.</p>
                <p className={styles.text}>I'm <span className={styles.name}>Trevor Sykes</span>, a DApp developer and DeFi architect. I love to build on <a href={'https://ethereum.org/en/'} target='_blank' className={styles.ethereum}>Ethereum</a>. </p>
                <p className={styles.text}>Check out my <Link to="/about" className={styles.bio}>bio</Link> to learn more about me - find my work on <a href="https://github.com/trev-sykes" target='_blank' className={styles.github}>github</a>.</p>
            </div>
        </div >
    )
}
