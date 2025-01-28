import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Contact from '../contact/Contact';
import styles from './Header.module.css';
interface HeaderProps {
    handleStateChange?: Function;
}
const Header: React.FC<HeaderProps> = () => {
    const [scrolled, setScrolled] = useState(false);
    const [contactPopupVisible, setContactPopupVisible] = useState(false);
    const [textColor, setTextColor] = useState('black');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [colorTheme, setColorTheme] = useState<any>('light');
    // Adjust scroll range dynamically based on screen size
    const scrollRange = windowWidth < 600 ? { min: 0, max: 0 } : { min: 25, max: 270 };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const isScrolled = scrollY > 0;
            setScrolled(isScrolled);

            // Change text color when scroll position is within the adjusted range
            if (scrollY > scrollRange.min && scrollY <= scrollRange.max) {
                setTextColor('white'); // Change to white when within this range
            } else {
                setTextColor('black'); // Revert to black when outside this range
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listeners
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [windowWidth, scrollRange]);

    const toggleContactPopup = () => {
        setContactPopupVisible(!contactPopupVisible);
    };

    return (
        <>
            {windowWidth < 600 ? (
                <>
                    <header className={`${styles.container} ${scrolled ? styles.scrolled : ''}`}>
                        <nav className={styles.nav}>
                            <div className={styles.left}>
                                <div className={styles.imageContainer}>
                                    <div className={styles.mugshotImageContainer}>
                                        <div className={styles.mugshotImage} />
                                    </div>
                                    <Link to="/" className={styles.mugshotName} style={{ color: textColor }}>
                                        portfolio
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.right}>
                                {/* Use Link instead of button for navigation */}
                                <Link to="/" className={styles.button} style={{ color: textColor }}>
                                    Home
                                </Link>
                                <Link to="/about" className={styles.button} style={{ color: textColor }}>
                                    About
                                </Link>
                                <button className={styles.button} style={{ color: textColor }} onClick={toggleContactPopup}>
                                    Contact
                                </button>
                                {colorTheme == 'dark' ? (
                                    <Moon
                                        className={styles.button}
                                        style={{ color: textColor }}
                                        onClick={() => setColorTheme('light')}
                                    />
                                ) : (
                                    <Sun
                                        className={styles.button}
                                        style={{ color: textColor }}
                                        onClick={() => setColorTheme('dark')}
                                    />
                                )}
                            </div>
                        </nav>
                    </header>
                    {contactPopupVisible && <Contact onClose={toggleContactPopup} />}

                </>
            ) : (
                <>
                    <header className={`${styles.container} ${scrolled ? styles.scrolled : ''}`}>
                        <nav className={styles.nav}>
                            <div className={styles.left}>
                                <div className={styles.imageContainer}>
                                    <div className={styles.mugshotImageContainer}>
                                        <div className={styles.mugshotImage} />
                                    </div>
                                    <Link to="/" className={styles.mugshotName} style={{ color: textColor }}>
                                        portfolio
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.right}>
                                {/* Use Link instead of button for navigation */}
                                <Link to="/about" className={styles.button} style={{ color: textColor }}>
                                    About
                                </Link>
                                <button className={styles.button} style={{ color: textColor }} onClick={toggleContactPopup}>
                                    Contact
                                </button>
                                {colorTheme == 'dark' ? (
                                    <Moon
                                        className={styles.button}
                                        style={{ color: textColor }}
                                        onClick={() => setColorTheme('light')}
                                    />
                                ) : (
                                    <Sun
                                        className={styles.button}
                                        style={{ color: textColor }}
                                        onClick={() => setColorTheme('dark')}
                                    />
                                )}
                            </div>
                        </nav>
                    </header>

                    {contactPopupVisible && <Contact onClose={toggleContactPopup} />}
                </>
            )
            }

        </>
    );
}
export default Header;