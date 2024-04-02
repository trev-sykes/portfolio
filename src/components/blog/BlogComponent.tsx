import { useState } from 'react';
import { magazine } from './articles';
import styles from './BlogComponent.module.css';
import BlogFullPage from './BlogFullPage';

const BlogComponent = () => {
    const [selectedBlog, setSelectedBlog] = useState<number | null>(null);
    const [showFullPage, setShowFullPage] = useState<boolean>(false);
    const [expandedBlogs, setExpandedBlogs] = useState<number[]>([]);

    const handleReadFullDescription = (index: number) => {
        if (!expandedBlogs.includes(index)) {
            setExpandedBlogs([...expandedBlogs, index]);
        } else {
            setExpandedBlogs(expandedBlogs.filter((item) => item !== index));
        }
    };

    const handleReadFullArticle = (index: number) => {
        setSelectedBlog(index);
        setShowFullPage(true); // Show full-page blog when "Read full article" is clicked

        // Scroll to the top of the full blog post
        const fullBlogPost = document.getElementById(`blog-${index}`);
        if (fullBlogPost) {
            fullBlogPost.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleCloseFullView = () => {
        setSelectedBlog(null);
        setShowFullPage(false); // Hide full-page blog
    };

    return (
        <>
            <h1 className={styles.blogs}>Blogs</h1>
        <div className={styles.container}>
            {!showFullPage && (
                <div className={styles.blogContainer}>
    {magazine.slice().reverse().map((blog, index) => (
        <div key={index} className={styles.blogPreview}>
            <h2>{blog.title}</h2>
            <p>
                {expandedBlogs.includes(index) ? blog.description : blog.description.substring(0, 100)}
                {blog.description.length > 100 && (
                    <button className={`${styles.readMoreButton} ${expandedBlogs.includes(index) ? styles.readLessActive : ''}`} onClick={() => handleReadFullDescription(index)}>
                        {expandedBlogs.includes(index) ? '...Read less' : '...Read more'}
                    </button>
                )}
            </p>
            <p className={styles.date}>{blog.date}</p>
            <div className={styles.topics}>
                {blog.topic.map((topic, topicIndex) => {
                    let topicClass = '';
                    if (topic === 'JavaScript') {
                        topicClass = styles.javascript;
                    } else if (topic === 'HTML Canvas') {
                        topicClass = styles.htmlcanvas;
                    } else if (topic === 'Game Development') {
                        topicClass = styles.gamedev;
                    } else if (topic === 'Phaser 3') {
                        topicClass = styles.phaserthree;
                    } else if (topic === 'Cryptocurrency') {
                        topicClass = styles.cryptocurrency;
                    } else if (topic === 'API Integration') {
                        topicClass = styles.apiintegration;
                    } else if (topic === 'Web Development') {
                        topicClass = styles.webdevelopment;
                    } else if (topic === 'Blockchain') {
                        topicClass = styles.blockchain;
                    } else if (topic === 'Smart Contracts') {
                        topicClass = styles.smartcontracts;
                    } else if (topic === 'Decentralized Applications') {
                        topicClass = styles.decentralizedapplications;
                    } else if (topic === 'Dapp Development') {
                        topicClass = styles.dappdevelopment;
                    } else if (topic === 'Market Trends') {
                        topicClass = styles.markettrends;
                    } else if (topic === 'Solidity') {
                        topicClass = styles.solidity;
                    }
                    return (
                        <span key={topicIndex} className={`${styles.topic} ${topicClass}`}>{topic}</span>
                    );
                })}
            </div>
            <img src={blog.imageUrl} alt={blog.title} className={styles.image} />
            <button className={styles.readFullArticleButton} onClick={() => handleReadFullArticle(magazine.length - index - 1)}>Read full article</button> {/* Reverse the index */}
        </div>
    ))}
</div>

            )}
            {selectedBlog !== null && showFullPage && (
                <BlogFullPage selectedBlog={selectedBlog} onClose={handleCloseFullView} />
            )}
        </div>
        </>
    );
};

export default BlogComponent;
