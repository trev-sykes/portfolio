import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText }) => {
  return (
    <footer className={styles.container}>
      <div>
        <p>&copy; {copyrightText}</p>
      </div>
      {/* <div className={styles.rockImage}></div> */}
    </footer>
  );
};

export default Footer;
