import styles from './AboutMain.module.css';
import ethereumLogo from '../../assets/eth_logo.png';
import foundryLogo from "../../assets/foundry_logo.png";
import cssLogo from '../../assets/css_logo.webp';
import reactLogo from '../../assets/react_logo.webp';
import { useState } from 'react';
import BlockchainBenefits from './blockchainBenefits/BlockChainBenefits';
const AboutMain: React.FC = () => {
    const [hovered, setHovered] = useState<any>();
    const handleMouseEnter = (state: any) => {
        setHovered(state);
    }
    const handleMouseLeave = () => {
        setHovered('');
    }
    const ethereumLogoStyles = {
        width: '150px',
        height: '150px',
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${ethereumLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        cursor: 'pointer'

    }
    const reactLogoStyles = {
        width: '150px',
        height: '150px',
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${reactLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        cursor: 'pointer'

    }
    const foundryLogoStyles = {
        width: '150px',
        height: '150px',
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${foundryLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        cursor: 'pointer'

    }
    const cssLogoStyles = {
        width: '150px',
        height: '150px',
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${cssLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        cursor: 'pointer'

    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <section className={styles.expertise}>
                    <div className={styles.left}>
                        <h3 className={styles.title}>Expertise</h3>
                        <p className={`${styles.paragraph} ${styles.first} ${hovered == 'solidity' ? styles.activeHover : ''}`}>
                            I specialize in building smart contracts with Solidity and creating front-end interfaces using React.
                        </p>
                        <p className={`${styles.paragraph} ${hovered == 'solidity' ? styles.activeHover : ''}`}>
                            I'm comfortable deploying to various L2's and sidechains, with a focus on Polygon and Arbitrum.
                        </p>
                        <p className={`${styles.paragraph} ${hovered == 'react' ? styles.activeHover : ''}`}>
                            React is my go-to for building dynamic, user-friendly UIs.<span className={`${styles.paragraph} ${hovered == 'css' ? styles.activeHover : ''}`}>I leverage vanilla CSS styling typically using the module aprroach to keep component styles specialized.</span>
                        </p>

                        <p className={`${styles.paragraph} ${hovered == 'foundry' ? styles.activeHover : ''}`}>
                            In addition to these, I use Foundry for smart contract development, ensuring clean, efficient code and faster testing cycles.
                        </p>
                        <p className={styles.paragraph}>
                            With this skill set, I can easily integrate blockchain functionality into existing systems, while building intuitive interfaces and highly specialized components that allow users to interact with decentralized apps.
                        </p>
                    </div>


                    <div className={styles.expertiseRight}>
                        <div onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter('solidity')} style={ethereumLogoStyles} title="1+ years of experience" />
                        <div onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter('react')} style={reactLogoStyles} title="2+ years of experience" />
                        <div onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter('foundry')} style={foundryLogoStyles} title="1+ years of experience" />
                        <div onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter('css')} style={cssLogoStyles} title="2+ years of experience" />
                    </div>
                </section>
                <BlockchainBenefits />
                {/* 
                <section className={styles.bio}>
                    <h3 className={styles.title}>Bio</h3>
                    <p className={`${styles.paragraph} ${styles.first}`}></p>
                    <p className={styles.paragraph}></p>
                    <p className={styles.paragraph}></p>
                    <p></p>
                </section> */}
            </div>
        </div>

    )
}

export default AboutMain;