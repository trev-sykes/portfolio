import React from 'react';
import styles from './Footer.module.css';
import logo from "../../assets/logo.png";

interface FooterProps {
  copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText }) => {
  const portfolioStyles = {
    width: '30px',
    height: '30px',
    backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${logo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '0%',
  }
  return (
    <footer className={styles.container}>
      <div className={styles.card}>
        <div className={styles.left}>
          <p> &copy; {copyrightText}</p>
          <div style={portfolioStyles} />
        </div>
        <div className={styles.right}>
          <a href="https://www.linkedin.com/in/trevsykes/" target='_blank' rel='nonreferrer'>Linkedin</a>
          <a href="https://www.linkedin.com/in/trevsykes/" target='_blank' rel='nonreferrer'>Github</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
