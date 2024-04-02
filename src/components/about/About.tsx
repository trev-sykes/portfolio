import styles from './About.module.css';

export default function About() {

    return (
            <div className={styles.container}>
                <h1 className={styles.title} >
                    Trevor Jacob Sykes
                </h1>
                <p className={styles.introParagraph}>

                Hi, I'm Trevor Sykes. I taught myself how to code, specializing in React and Solidity. Most of my skills come from working on my own projects, where I've grown to love using tech to make a difference.
                </p>
                <br></br>
                <p className={styles.introParagraph}>
                I'm excited to join a progressive company where I can use my skills on impactful projects. I specialize in front-end development and blockchain technology, aiming to create easy-to-use interfaces and find creative solutions to tough challenges.
                </p>
                <br></br>
                <p className={styles.introParagraph}>
                I'm motivated by using tech to help others, like making things easier or more accessible. I'm all in for using what I know to make an impact. I look forward to working with a team where I can share, learn, and grow.
                </p>
            </div>
    );
}
