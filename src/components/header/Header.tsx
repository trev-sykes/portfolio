import { useState, useEffect } from 'react';
import { LucideSend } from 'lucide-react';
import Contact from '../contact/Contact'; // Adjust the path as needed
import styles from './Header.module.css';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [contactPopupVisible, setContactPopupVisible] = useState(false);
    const [textColor, setTextColor] = useState('black'); // Default text color
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width

    // Adjust scroll range dynamically based on screen size
    const scrollRange = windowWidth < 600 ? { min: 0, max: 0 } : { min: 16, max: 284 };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth); // Update window width on resize
        };

        const handleScroll = () => {
            const scrollY = window.scrollY; // Get the current scroll position
            const isScrolled = scrollY > 0;
            setScrolled(isScrolled);

            // Change text color when scroll position is within the adjusted range
            if (scrollY > scrollRange.min && scrollY <= scrollRange.max) {
                setTextColor('white'); // Change to white when within this range
            } else {
                setTextColor('black'); // Revert to black when outside this range
            }
        };

        window.addEventListener('resize', handleResize); // Listen for resize events
        window.addEventListener('scroll', handleScroll); // Listen for scroll events

        // Cleanup event listeners
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [windowWidth, scrollRange]); // Re-run effect when windowWidth or scrollRange changes

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
