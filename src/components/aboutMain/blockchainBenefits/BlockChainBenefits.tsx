import React from 'react';
import { Coins, Building, Users, DollarSign } from 'lucide-react';
import styles from './BlockChainBenefits.module.css';

const BlockchainBenefits = () => {
    const benefits = [
        {
            icon: <Coins className={`${styles.icon} ${styles.iconPurple}`} />,
            title: "Utility Tokenomics Integration",
            description: "Create value through ERC-20 tokens tied to reward systems. Users earn tokens through participation, with autonomous and transparent minting logic.",
            highlight: "ERC-20",
            cardStyle: styles.cardPurple
        },
        {
            icon: <Building className={`${styles.icon} ${styles.iconBlue}`} />,
            title: "Asset Tokenization",
            description: "Transform property ownership into NFTs containing vital data, enabling seamless, trustless transfers with verifiable, immutable records.",
            highlight: "NFT",
            cardStyle: styles.cardBlue
        },
        {
            icon: <Users className={`${styles.icon} ${styles.iconGreen}`} />,
            title: "Decentralized Autonomous Organizations",
            description: "Implement DAOs for system governance and automated, transparent logic execution through Smart Contracts.",
            highlight: "Smart Contracts",
            cardStyle: styles.cardGreen
        },
        {
            icon: <DollarSign className={`${styles.icon} ${styles.iconYellow}`} />,
            title: "Alternative Stablecoins",
            description: "Develop stablecoins backed by assets other than USD, creating new possibilities for value storage and transfer.",
            highlight: "",
            cardStyle: styles.cardYellow
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Curious about the possibilities?</h3>
                <div className={styles.divider}></div>
            </div>

            <div className={styles.grid}>
                {benefits.map((benefit, index) => (
                    <div key={index} className={`${styles.card} ${benefit.cardStyle}`}>
                        <div className={styles.iconWrapper}>
                            {benefit.icon}
                        </div>
                        <h3 className={styles.cardTitle}>
                            {benefit.title}
                        </h3>
                        <p className={styles.description}>
                            {benefit.description.split(benefit.highlight).map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span className={styles.highlight}>
                                            {benefit.highlight}
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlockchainBenefits;