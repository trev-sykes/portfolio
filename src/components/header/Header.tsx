import { useState, useEffect } from 'react';
import search from '../../assets/search.svg';
import dark from '../../assets/moon.png';
import styles from '../../components/header/Header.module.css';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [, setSessionTime] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setSessionTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    return (
        <>
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
                <nav className={styles.nav}>
                    <div className={styles.left}>
                        <div className={styles.imageContainer}>
                            <div className={styles.mugshotImageContainer}>
                                <div className={styles.mugshotImage} />
                            </div>
                            <span className={styles.mugshotName}>Trevor Jacob Sykes</span>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button className={styles.contactButton}>Contact</button>
                        <button>
                            <img className={styles.icon} src={dark} alt="" />
                        </button>
                        <button>
                            <img className={styles.icon} src={search} alt="" />
                        </button>
                        {/* <span className={styles.sessionTimer}>{formatTime(sessionTime)}</span> */}
                    </div>
                </nav>
            </header>
        </>
    );
}
