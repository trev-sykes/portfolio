import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, MenuSquare, Minimize2 } from 'lucide-react';
import Contact from '../contact/Contact';
import TransitionLayout from '../transitionLayout/TransitionLayout';
import { useViewportSize } from '../../hooks/useViewportSize';
import { useWindowScroll } from '../../hooks/useWindowScroll';
import styles from './Navigation.module.css';

interface NavigationProps {
    triggerLoad?: Function;
    handleStateChange?: Function;
    subSection?: string;
}

const Navigation: React.FC<NavigationProps> = ({ subSection }) => {
    const viewportSize = useViewportSize();
    const { scrollPosition } = useWindowScroll();
    const location = useLocation();
    const [active, setActive] = useState('home');
    const [isClicked, setIsClicked] = useState(false);
    const [contactPopupVisible, setContactPopupVisible] = useState(false);
    const [colorTheme, setColorTheme] = useState<any>('light');

    // Update active state based on current path
    useEffect(() => {
        const path = location.pathname.slice(1) || 'home';
        setActive(path);
    }, [location]);
    const toggleContactPopup = () => {
        setContactPopupVisible(!contactPopupVisible);
    };

    const renderLink = (to: string, label: string) => (
        <Link
            to={to}
            className={`${styles.button} ${active === to.slice(1) ? styles.active : ''}`}
        >
            {label}
        </Link>
    );

    return (
        <TransitionLayout>
            <>
                {viewportSize.width < 609 ? (
                    <>
                        <header className={`${styles.container} ${scrollPosition.y > 0 ? styles.scrolled : ''}`}>
                            <nav className={styles.nav}>
                                <div className={styles.left}>
                                    <div className={styles.imageContainerSmall}>
                                        <div className={styles.mugshotImageContainer}>
                                            <div className={styles.mugshotImage} />
                                        </div>
                                        <Link to="/" className={styles.mugshotName}>
                                            portfolio
                                        </Link>
                                    </div>
                                </div>
                                {isClicked ? (
                                    <div className={styles.menuContainer}>
                                        <div className={styles.right}>
                                            {renderLink('/about', 'About')}
                                            {renderLink('/projects', 'Projects')}
                                            {renderLink('/blogs', 'Blogs')}
                                            <button className={styles.button} onClick={toggleContactPopup}>
                                                Contact
                                            </button>
                                            <Minimize2 onClick={() => setIsClicked(false)} />
                                        </div>
                                    </div>
                                ) : (
                                    <MenuSquare onClick={() => setIsClicked(true)} />
                                )}
                            </nav>
                        </header>
                    </>
                ) : (
                    <>
                        <header className={`${styles.container} ${scrollPosition.y > 0 ? styles.scrolled : ''}`}>
                            <nav className={styles.nav}>
                                <div className={styles.left}>
                                    <Link to="/" className={styles.mugshotName} >
                                        <div className={styles.imageContainer}>
                                            <div className={styles.mugshotImageContainer}>
                                                <div className={styles.mugshotImage} />
                                            </div>
                                            <p className={styles.mugshotName}>portfolio</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className={styles.right}>
                                    {viewportSize.width > 1000 && subSection && (
                                        <div
                                            className={`${styles.button} ${active === subSection.slice(1) ? styles.active : ''} ${subSection && styles.subSection}`}
                                        >
                                            {`${subSection}`}
                                        </div>)}
                                    {renderLink('/about', 'About')}
                                    {renderLink('/projects', 'Projects')}
                                    {renderLink('/blogs', 'Blogs')}
                                    <div className={styles.button} onClick={toggleContactPopup}>
                                        Contact
                                    </div>
                                    {colorTheme === 'dark' ? (
                                        <Moon
                                            className={`${styles.button} ${styles.toggleTheme}`}
                                            onClick={() => setColorTheme('light')}
                                        />
                                    ) : (
                                        <Sun
                                            className={`${styles.button} ${styles.toggleTheme}`}
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
        </TransitionLayout >
    );
};

export default Navigation;