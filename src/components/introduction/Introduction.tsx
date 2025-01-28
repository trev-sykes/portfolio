import styles from './Introduction.module.css';
import { Link } from 'react-router-dom';
export const Introduction = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <p className={styles.text}>Hello World 👋.</p>
                <p className={styles.text}>I'm <span className={styles.name}>Trevor Sykes</span>, a DApp developer and DeFi architect. I love to build on <a href={'https://ethereum.org/en/'} target='_blank' className={styles.ethereum}>Ethereum</a>. </p>
                <p className={styles.text}>You can check out my <Link to="/about" className={styles.bio}>Bio</Link> to learn more and find my work on my <a href="https://github.com/trev-sykes" target='_blank' className={styles.github}>Github</a>.</p>
            </div>
        </div >
    )
}
