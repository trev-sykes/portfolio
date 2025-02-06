import SpaceThemeBanner from '../spaceThemeBanner/SpaceThemeBanner';
import homepageMugshotImage from '../../assets/logo.png';
import projectpageMugshotImage from "../../assets/project_hero.png";
import bitcoinProtocol from '../../assets/satoshi.png';
import cred from "../../assets/peer-link-logo-nobg-big.png";
import rollSix from "../../assets/bet-button.png"
import landingPage from "../../assets/landingPage.png"
import styles from './Hero.module.css';
import landingTemplate from '../projects/project/landingTemplate';

interface HeroProps {
    section: string;
}
const Hero: React.FC<HeroProps> = ({ section }) => {
    return (
        <div className={styles.container} style={{ marginBottom: section == 'about' ? '10px' : '75px' }}>
            <div className={styles.bannerContainer}>
                <div className={styles.canvasContainer}>
                    <SpaceThemeBanner />
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
                </div>
            </div>
        </div >
    );
};

export default Hero;
