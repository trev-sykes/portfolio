import { useState, useEffect } from 'react';
import { LucideSend } from 'lucide-react';
import Contact from '../contact/Contact'; // Adjust the path as needed
import styles from './Header.module.css';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [contactPopupVisible, setContactPopupVisible] = useState(false);
    const [textColor, setTextColor] = useState('black'); // Default text color

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY; // Get the current scroll position
            const isScrolled = scrollY > 0;
            setScrolled(isScrolled);

            // Change text color when scroll position is between 0 and 144px
            if (scrollY > 15 && scrollY <= 285) {
                setTextColor('white'); // Change to red when within this range
            } else {
                setTextColor('black'); // Revert to black when outside this range
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // The empty array ensures this runs only once, after the initial render

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
                            <span className={styles.mugshotName} style={{ color: textColor }}>
                                Trevor Sykes
                            </span>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <LucideSend
                            className={styles.contactButton}
                            onClick={toggleContactPopup}
                            size={24}
                            strokeWidth={2}
                            color={textColor}
                        />
                    </div>
                </nav>
            </header>
            {contactPopupVisible && <Contact onClose={toggleContactPopup} />}
        </>
    );
}
