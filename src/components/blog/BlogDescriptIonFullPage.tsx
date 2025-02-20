import React, { useEffect } from 'react';
import styles from './BlogDescriptionFullPage.module.css';
import { magazine } from './articles';
import { Section } from './articleInterfaces';
import CodeBlockFormatter from '../codeBlockFormatter/CodeBlockFormatter';
import { useParams } from 'react-router-dom';

const BlogDescriptionFullPage: React.FC = () => {
    // Extract the project name from the URL
    const { blogName } = useParams<{ blogName: string }>();

    const renderSection = (section: Section) => (
        <div key={section.sectionTitle} className={styles.sectionContainer} id={section.sectionTitle.replace(/\s+/g, '-')}>
            <h2 className={styles.sectionTitle}>{section.sectionTitle}</h2>
            {section.content.map((paragraph, index) => (
                <p key={index} className={styles.sectionContent}>{paragraph}</p>
            ))}
            {section.codeBlocks?.map((codeBlock, index) => (
                <CodeBlockFormatter
                    key={index}
                    language={codeBlock.language}
                    code={codeBlock.code}
                />
            ))}
        </div>
    );

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => e.stopPropagation();
        document.addEventListener('wheel', handleScroll, { passive: false });
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('wheel', handleScroll);
            document.body.style.overflow = '';
        };
    }, []);

    // Find the project based on the title in the URL
    const project = magazine.find((p) => p.title === blogName);

    if (!project) return <div>Blog not found</div>;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <div className={styles.image} style={{ backgroundImage: `url(${project.imageUrl})` }} />
                </div>
                <p className={styles.date}>Published on {project.date}</p>
                {project.sections.map((section) => renderSection(section))}
            </div>
        </div>
    );
};

export default BlogDescriptionFullPage;
