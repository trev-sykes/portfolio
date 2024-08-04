import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
    loadingStyle?: React.CSSProperties;
}

const Loading: React.FC<LoadingProps> = ({ loadingStyle }) => {
    return (
        <div className={styles.loading}>
            <div className={styles.bitcoin} style={loadingStyle}></div>
        </div>
    );
};

export default Loading;
