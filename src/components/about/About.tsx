import styles from './About.module.css';

export default function About() {

    return (
            <div className={styles.container}>
                <h1 className={styles.title} >
                    Trevor Jacob Sykes
                </h1>
                <p className={styles.introParagraph}>

                Hey, I'm Trevor Sykes. I've taught myself how to code, focusing on building dApps in CSS, React, and Solidity. Most of what I know comes from my own projects, where I've really come to love using tech to make a difference.
                </p>
                <br></br>
                <br></br>
                <p className={styles.introParagraph}>
                My passion lies in using my skills to enhance accessibility and streamline processes. From developing user-friendly interfaces to implementing smart contracts, I'm committed to making complex technologies more approachable
                </p>
            </div>
    );
}
