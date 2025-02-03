import styles from './AboutIntro.module.css';
import mugshot from '../../assets/mugshot_small.png';
import mugshotMobile from "../../assets/mugshot_large.jpeg"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const AboutIntro: React.FC = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleWidthChange = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWidthChange);

        return () => window.removeEventListener('resize', handleWidthChange);
    }, [])
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.leftHero}>
                    <h3 className={styles.introParagraph}>Greetings</h3>
                    <p className={styles.paragraph}>My name is <span className={styles.name}>Trevor Sykes</span></p>
                    <p className={styles.paragraph}>I am a blockchain developer, building on the <a className={styles.ethereum} href="https://ethereum.org/en/" target='_blank'>EVM</a>.</p>
                    <p className={styles.paragraph}>My experience comes from personal <Link className={styles.projectsLink} to='/projects' >projects</Link>.</p>
                    <p className={styles.paragraph}>All of my work is open source. Feel free to check out my <a className={styles.github} href="https://github.com/trev-sykes" target='_blank'>github</a>.</p>
                </div>
                <div className={styles.rightHero}>
                    <div className={styles.heroImgContainer}>
                        <img className={styles.heroImg} src={width > 600 ? mugshot : mugshotMobile} alt="Mugshot" />
                    </div>
                </div>
            </section>
        </div>
    )
}
