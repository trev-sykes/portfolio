import React from 'react';
import styles from './Footer.module.css';
import logo from "../../assets/logo.png";
// import { FaLinkedin, FaGithub } from "react-icons/";
import { LinkedinIcon, Github } from 'lucide-react';

interface FooterProps {
  copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText }) => {
  return (
    <footer className={styles.container}>
      <div className={styles.card}>
        {/* Left Section - Logo */}
        <div className={styles.left}>
          <div className={styles.logo} style={{ backgroundImage: `url(${logo})` }} />
          <span className={styles.logoText}>Portfolio</span>
        </div>

        {/* Right Section - Social Links */}
        <div className={styles.right}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinIcon className={styles.icon} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className={styles.icon} />
          </a>
        </div>
      </div>

      {/* Copyright Text */}
      <div className={styles.copyright}>© {copyrightText}</div>
    </footer>
  );
};

export default Footer;
