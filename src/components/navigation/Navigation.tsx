import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, MenuSquare, Minimize2 } from 'lucide-react';
import Contact from '../contact/Contact';
import styles from './Navigation.module.css';
import TransitionLayout from '../transitionLayout/TransitionLayout';

interface NavigationProps {
    triggerLoad?: Function;
    handleStateChange?: Function;
}

const Navigation: React.FC<NavigationProps> = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('home');
    const [isClicked, setIsClicked] = useState(false);
    const [contactPopupVisible, setContactPopupVisible] = useState(false);
    const [textColor, setTextColor] = useState('black');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [colorTheme, setColorTheme] = useState<any>('light');

    // Update active state based on current path
    useEffect(() => {
        const path = location.pathname.slice(1) || 'home';
        setActive(path);
    }, [location]);

    const scrollRange = windowWidth < 600 ? { min: 0, max: 0 } : { min: 25, max: 270 };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const isScrolled = scrollY > 0;
            setScrolled(isScrolled);

            if (scrollY > scrollRange.min && scrollY <= scrollRange.max) {
                setTextColor('white');
            } else {
                setTextColor('black');
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [windowWidth, scrollRange]);

    const toggleContactPopup = () => {
        setContactPopupVisible(!contactPopupVisible);
    };

    const renderLink = (to: string, label: string) => (
        <Link
            to={to}
            className={`${styles.button} ${active === to.slice(1) ? styles.active : ''}`}
            style={{ color: textColor }}
        >
            {label}
        </Link>
    );

    return (
        <TransitionLayout>
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
                                {isClicked ? (
                                    <div className={styles.right}>
                                        {renderLink('/about', 'About')}
                                        {renderLink('/projects', 'Projects')}
                                        <button className={styles.button} style={{ color: textColor }} onClick={toggleContactPopup}>
                                            Contact
                                        </button>
                                        <Minimize2 onClick={() => setIsClicked(false)} />
                                    </div>
                                ) : (
                                    <MenuSquare onClick={() => setIsClicked(true)} />
                                )}
                            </nav>
                        </header>
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
                                    {renderLink('/about', 'About')}
                                    {renderLink('/projects', 'Projects')}
                                    <div className={styles.button} style={{ color: textColor }} onClick={toggleContactPopup}>
                                        Contact
                                    </div>
                                    {colorTheme === 'dark' ? (
                                        <Moon
                                            className={`${styles.button} ${styles.toggleTheme}`}
                                            style={{ color: textColor }}
                                            onClick={() => setColorTheme('light')}
                                        />
                                    ) : (
                                        <Sun
                                            className={`${styles.button} ${styles.toggleTheme}`}
                                            style={{ color: textColor }}
                                            onClick={() => setColorTheme('dark')}
                                        />
                                    )}
                                </div>
                            </nav>
                        </header>
                    </>
                )}
                {contactPopupVisible && <Contact onClose={toggleContactPopup} />}
            </>
        </TransitionLayout>
    );
};

export default Navigation;