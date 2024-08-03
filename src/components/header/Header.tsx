import { useState, useEffect } from 'react';
import search from '../../assets/search.svg';
import dark from '../../assets/moon.png';
import Contact from '../contact/Contact'; // Adjust the path as needed
import styles from './Header.module.css';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [contactPopupVisible, setContactPopupVisible] = useState(false);

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

    const toggleContactPopup = () => {
        setContactPopupVisible(!contactPopupVisible);
    };

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
                        <button className={styles.contactButton} onClick={toggleContactPopup}>
                            Contact
                        </button>
                        {/* <button className={styles.iconButton}>
                            <img className={styles.icon} src={dark} alt="Toggle theme" />
                        </button>
                        <button className={styles.iconButton}>
                            <img className={styles.icon} src={search} alt="Search" />
                        </button> */}
                    </div>
                </nav>
            </header>
            {contactPopupVisible && <Contact onClose={toggleContactPopup} />}
        </>
    );
}
