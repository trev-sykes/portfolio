import { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { magazine } from './articles';
import styles from './BlogComponent.module.css';
import BlogFullPage from './BlogFullPage';

const BlogComponent = () => {
    const [selectedBlog, setSelectedBlog] = useState<number | null>(null);
    const [showFullPage, setShowFullPage] = useState<boolean>(false);
    const [expandedBlogs, setExpandedBlogs] = useState<number[]>([]);
    const [typewriterStarted, setTypewriterStarted] = useState<boolean>(false);
    const blogRefs = useRef<HTMLDivElement[]>([]);
    const headingRef = useRef<HTMLDivElement>(null);

    // Function to handle scroll event and update opacity
    const handleScroll = () => {
        blogRefs.current.forEach((blog) => {
            const rect = blog.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom >= 0) {
                // Calculate opacity based on the position of the element
                const visibility = 1 - Math.max(0, (windowHeight + rect.top - 1450) / windowHeight);
                blog.style.opacity = visibility.toString();
            } else {
                blog.style.opacity = '0'; // Fully transparent when out of view
            }
        });
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.0,
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setTypewriterStarted(true);
                    }, 300);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        blogRefs.current.forEach((blog) => {
            observer.observe(blog);
        });

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call to set opacity based on current scroll position

        return () => {
            window.removeEventListener('scroll', handleScroll);
            blogRefs.current.forEach((blog) => {
                observer.unobserve(blog);
            });
            if (headingRef.current) {
                observer.unobserve(headingRef.current);
            }
        };
    }, []);

    const handleReadFullDescription = (index: number) => {
        if (!expandedBlogs.includes(index)) {
            setExpandedBlogs([...expandedBlogs, index]);
        } else {
            setExpandedBlogs(expandedBlogs.filter((item) => item !== index));
        }
    };

    const handleReadFullArticle = (index: number) => {
        setSelectedBlog(index);
        setShowFullPage(true);

        const fullBlogPost = document.getElementById(`blog-${index}`);
        if (fullBlogPost) {
            fullBlogPost.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleCloseFullView = () => {
        setSelectedBlog(null);
        setShowFullPage(false);
    };

    return (
        <>
            <div className={`${styles.blogs} ${typewriterStarted ? styles.fadeInVisible : ''}`}>
                <h1 ref={headingRef}>
                    {
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString('Bitcoi') // Typing the incorrect string
                                    .pauseFor(50) // Pause before starting correction
                                    .deleteAll() // Delete incorrect string
                                    .typeString('Blogs') // Correct string
                                    .start(); // Start the effect
                            }}
                            options={{
                                cursor: '', // Set the cursor to an underscore
                                deleteSpeed: 7000,
                            }}
                        />
                    }
                </h1>
            </div>

            <div className={styles.container}>
                {!showFullPage && (
                    <div className={styles.blogContainer}>
                        {magazine.slice().reverse().map((blog, index) => (
                            <div
                                key={index}
                                className={`${styles.blogPreview}`}
                                ref={(el) => (blogRefs.current[index] = el as HTMLDivElement)}
                            >
                                <h2>{blog.title}</h2>
                                <p>
                                    {expandedBlogs.includes(index) ? blog.description : blog.description.substring(0, 100)}
                                    {blog.description.length > 100 && (
                                        <button
                                            className={`${styles.readMoreButton} ${expandedBlogs.includes(index) ? styles.readLessActive : ''}`}
                                            onClick={() => handleReadFullDescription(index)}
                                        >
                                            {expandedBlogs.includes(index) ? '...Read less' : '...Read more'}
                                        </button>
                                    )}
                                </p>
                                <p className={styles.date}>{blog.date}</p>
                                <div className={styles.topics}>
                                    {blog.topic.map((topic, topicIndex) => {
                                        let topicClass = '';
                                        switch (topic) {
                                            case 'JavaScript':
                                                topicClass = styles.javascript;
                                                break;
                                            case 'HTML Canvas':
                                                topicClass = styles.htmlcanvas;
                                                break;
                                            case 'Game Development':
                                                topicClass = styles.gamedev;
                                                break;
                                            case 'Phaser 3':
                                                topicClass = styles.phaserthree;
                                                break;
                                            case 'Cryptocurrency':
                                                topicClass = styles.cryptocurrency;
                                                break;
                                            case 'API Integration':
                                                topicClass = styles.apiintegration;
                                                break;
                                            case 'Web Development':
                                                topicClass = styles.webdevelopment;
                                                break;
                                            case 'Blockchain':
                                                topicClass = styles.blockchain;
                                                break;
                                            case 'Smart Contracts':
                                                topicClass = styles.smartcontracts;
                                                break;
                                            case 'Decentralized Applications':
                                                topicClass = styles.decentralizedapplications;
                                                break;
                                            case 'Dapp Development':
                                                topicClass = styles.dappdevelopment;
                                                break;
                                            case 'Market Trends':
                                                topicClass = styles.markettrends;
                                                break;
                                            case 'Solidity':
                                                topicClass = styles.solidity;
                                                break;
                                            case 'Tutorial':
                                                topicClass = styles.tutorial;
                                                break;
                                            default:
                                                topicClass = '';
                                        }
                                        return (
                                            <span key={topicIndex} className={`${styles.topic} ${topicClass}`}>
                                                {topic}
                                            </span>
                                        );
                                    })}
                                </div>
                                <img src={blog.imageUrl} alt={blog.title} className={styles.image} />
                                <button
                                    className={styles.readFullArticleButton}
                                    onClick={() => handleReadFullArticle(magazine.length - index - 1)}
                                >
                                    Read full article
                                </button>
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
