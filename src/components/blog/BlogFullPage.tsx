import React, { useEffect } from 'react';
import styles from './BlogFullPage.module.css';
import { Minimize2 } from 'lucide-react';
import { magazine } from './articles';
import { Section } from './articleInterfaces';
import CodeBlockFormatter from '../codeBlockFormatter/CodeBlockFormatter';

interface Props {
    selectedBlog?: number | null;
    onClose?: () => void;
}

const BlogFullPage: React.FC<Props> = ({ selectedBlog, onClose }) => {
    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            e.stopPropagation();
        };

        document.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []);

    if (selectedBlog === null) {
        return null;
    }

    const article = selectedBlog && magazine[selectedBlog];

    const renderSection = (section: Section) => {
        return (
            <>
                <div className={styles.sectionContent}>
                    {section.content}
                </div>
                {section.codeBlocks?.map((codeBlock, index) => (
                    <CodeBlockFormatter
                        key={index}
                        language={codeBlock.language}
                        code={codeBlock.code}
                    />
                ))}
            </>
        );
    };

    return (
        <>
            {selectedBlog && article &&
                <div id={`blog-${selectedBlog}`} className={styles.container}>
                    <div className={styles.header}>
                        <h1 className={styles.titleHeader}>{article.title}</h1>
                        <Minimize2
                            className={styles.min}
                            strokeWidth={3}
                            onClick={onClose}
                            size={24}
                        />
                    </div>

                    <div className={styles.content}>
                        <div className={styles.imageContainer}>
                            <div
                                className={styles.image}
                                style={{ backgroundImage: `url(${article.imageUrl})` }}
                            />
                        </div>
                        <p className={styles.date}>Published on {article.date}</p>
                        {article.sections.map((section, index) => (
                            <div key={index} id={section.sectionTitle.replace(/\s+/g, '-')}>
                                <h2 className={styles.sectionTitle}>{section.sectionTitle}</h2>
                                {renderSection(section)}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default BlogFullPage;
