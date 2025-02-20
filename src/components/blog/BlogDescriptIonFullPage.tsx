
import React, { useEffect } from 'react';
import styles from './BlogDescriptionFullPage.module.css';
import { magazine } from './articles';
import { Section } from './articleInterfaces';
import CodeBlockFormatter from '../codeBlockFormatter/CodeBlockFormatter';
import { useParams } from 'react-router-dom'; // Import useParams and useNavigate


const BlogDescriptionFullPage: React.FC = () => {
    // Extract the project name from the URL
    const { blogName } = useParams<{ blogName: string }>();
    console.log("Blog name: ", blogName);
    // const navigate = useNavigate(); // We can use navigate to go back if needed
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
    useEffect(() => {

        const handleScroll = (e: WheelEvent) => e.stopPropagation();
        document.addEventListener('wheel', handleScroll, { passive: false });
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        return () => {
            document.removeEventListener('wheel', handleScroll);
            document.body.style.overflow = ''; // Restore scrolling on unmount
        };
    }, []);

    // Find the project based on the title in the URL
    const project = magazine.find(
        (p) => {
            // console.log("Finding");
            // console.log("p.title", p.title);
            // console.log("blogName", blogName);
            if (p.title == blogName)
                return encodeURIComponent(p.title == blogName)
        }
    );

    if (!project) return <div>Blog not found</div>; // Handle case where project doesn't exist

    // const handleClose = () => {
    //   navigate('/projects'); // Navigate back to the projects page when closed
    // };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <div
                            className={styles.image}
                            style={{ backgroundImage: `url(${project.imageUrl})` }}
                        />
                    </div>
                    <p className={styles.date}>Published on {project.date}</p>
                    {project.sections.map((section: any, index: any) => (
                        <div key={index} id={section.sectionTitle.replace(/\s+/g, '-')}>
                            <h2 className={styles.sectionTitle}>{section.sectionTitle}</h2>
                            {renderSection(section)}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BlogDescriptionFullPage;