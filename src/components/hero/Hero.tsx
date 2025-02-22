import SpaceThemeBanner from '../spaceThemeBanner/SpaceThemeBanner';
import homepageMugshotImage from '../../assets/logo.png';
import projectpageMugshotImage from "../../assets/project_hero.png";
import bitcoinProtocol from '../../assets/satoshi.png';
import cred from "../../assets/peer-link-logo-nobg-big.png";
import rollSix from "../../assets/bet-button.png"
import landingPage from "../../assets/landingPage.png"
import styles from './Hero.module.css';

interface HeroProps {
    section: string;
    CustomBanner?: any;
}
const Hero: React.FC<HeroProps> = ({ section, CustomBanner }) => {
    return (
        <div className={styles.container} style={{ marginBottom: section == 'about' ? '10px' : '75px' }}>
            <div className={styles.bannerContainer}>
                <div className={styles.canvasContainer}>
                    {!CustomBanner && <SpaceThemeBanner />}
                    {CustomBanner && <CustomBanner />}
                </div>
                <div className={styles.mugshotContainer}>
                    {section == 'home' && (<div className={styles.homePageMugshot} style={{
                        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${homepageMugshotImage})`
                    }} />)}
                    {section == 'about' && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: section == 'about' || section == 'projects' ? '25px' : '0' }}>👋</p>
                        </div>
                    )}
                    {section == 'projects' && (
                        <div className={styles.projectPageMugshot} style={{
                            backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${projectpageMugshotImage})`
                        }} />
                    )}
                    {section == 'blogs' && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: '25px' }}>🖋️</p>
                        </div>
                    )}
                    {section == 'Bonding Curve Simulator' && (
                        <div className={styles.projectPageMugshot} style={{
                            backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${projectpageMugshotImage})`
                        }} />
                    )}
                    {section == 'Peer Link' && (
                        <div className={styles.projectPageMugshotPL} style={{
                            backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${cred})`
                        }} />
                    )}
                    {section == 'Bitcoin Stablecoin Protocol' && (
                        <div className={styles.projectPageMugshotSP} style={{
                            backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${bitcoinProtocol})`
                        }} />
                    )}
                    {section == 'Roll Six Win' && (
                        <div className={styles.projectPageMugshotRS} style={{
                            backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${rollSix})`
                        }} />
                    )}
                    {section == 'Landing Template' && (
                        <div className={styles.projectPageMugshotLP} style={{
                            backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${landingPage})`
                        }} />
                    )}
                    {section == '2024: A Year of Transformation in Crypto and Blockchain' && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: '25px' }}>🖋️</p>
                        </div>
                    )}
                    {section == 'AI Meets Crypto' && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: '25px' }}>🖋️</p>
                        </div>
                    )}
                    {section == 'Understanding the Relationship Between L2s and Ethereum' && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: '25px' }}>🖋️</p>
                        </div>
                    )}
                    {section == `The Evolution of DeFi: From Ethereum's Genesis to Modern Financial Infrastructure` && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: '25px' }}>🖋️</p>
                        </div>
                    )}
                    {section == 'The State of Crypto: February 2024 Market Analysis' && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: '25px' }}>🖋️</p>
                        </div>
                    )}
                    {section == 'Building a Lottery DApp: A Technical Overview' && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: '25px' }}>🖋️</p>
                        </div>
                    )}
                    {section == 'CoinGecko API Tutorial' && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: '25px' }}>🖋️</p>
                        </div>
                    )}
                    {section == 'Phaser 3 Platformer Game Tutorial' && (
                        <div className={styles.emoji}>
                            <p className={styles.emojiStyles} style={{ marginTop: '25px' }}>🖋️</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Hero;
