import { useState, useRef, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { magazine } from './articles';
import styles from './BlogComponent.module.css';
import BlogFullPage from './BlogFullPage';

const BlogComponent = () => {
    const [selectedBlog, setSelectedBlog] = useState<number | null>(null);
    const [showFullPage, setShowFullPage] = useState<boolean>(false);
    const [animatingBlog, setAnimatingBlog] = useState<number | null>(null);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const [expandedBlogs, setExpandedBlogs] = useState<number[]>([]);
    const [typewriterStarted, setTypewriterStarted] = useState<boolean>(false);
    const [showAllBlogs, setShowAllBlogs] = useState(false);
    const blogRefs = useRef<HTMLDivElement[]>([]);
    const headingRef = useRef<HTMLDivElement>(null);

    const handleReadFullDescription = (index: number) => {
        if (!expandedBlogs.includes(index)) {
            setExpandedBlogs([...expandedBlogs, index]);
        } else {
            setExpandedBlogs(expandedBlogs.filter((item) => item !== index));
        }
    };

    const handleResize = () => {
        setViewportWidth(window.innerWidth);
    };

    const handleScroll = () => {
        typewriterStarted;
        blogRefs.current.forEach((blog) => {
            let rect: DOMRect = {
                x: 146,
                y: 50,
                width: 440,
                height: 240,
                top: 50,
                right: 586,
                bottom: 290,
                left: 146,
                toJSON: () => ({
                    x: 146,
                    y: 50,
                    width: 440,
                    height: 240,
                    top: 50,
                    right: 586,
                    bottom: 290,
                    left: 146
                }),
            };
            if (blog) {
                rect = blog.getBoundingClientRect();
            }

            const windowHeight = window.innerHeight;

            if (viewportWidth < 600) {
                if (blog) {
                    blog.style.opacity = '1';
                }
            } else {
                if (rect.top < windowHeight && rect.bottom >= 0) {
                    const visibility = 1 - Math.max(0, (windowHeight + rect.top - 1450) / windowHeight);
                    if (blog) {
                        blog.style.opacity = visibility.toString();
                    }
                } else {
                    if (blog) {
                        blog.style.opacity = '0';
                    }
                }
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
            if (blog) {
                observer.observe(blog);
            }
        });

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            blogRefs.current.forEach((blog) => {
                if (blog) {
                    observer.unobserve(blog);
                }
            });
            if (headingRef.current) {
                observer.unobserve(headingRef.current);
            }
        };
    }, [viewportWidth]);

    const handleViewAllBlogs = () => {
        setShowAllBlogs(true);
    };

    const handleHideBlogs = () => {
        setShowAllBlogs(false);
    };

    const handleReadFullArticle = (index: number) => {
        setAnimatingBlog(index); // Set the blog to animate
        setSelectedBlog(index);
        setShowFullPage(true);
    };

    const handleCloseFullView = () => {
        setSelectedBlog(null);
        setAnimatingBlog(null); // Reset the animation state
        setShowFullPage(false);
        document.body.style.overflow = ''; // Restore body overflow
    };
    animatingBlog;
    return (
        <>
            <div className={`${styles.blogs} ${typewriterStarted ? styles.fadeInVisible : ''}`}>
                <h1 ref={headingRef}>
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString('Bitcoi')
                                .pauseFor(350)
                                .deleteAll()
                                .typeString('Blogs')
                                .start();
                        }}
                        options={{
                            cursor: '',
                            deleteSpeed: 7000,
                        }}
                    />
                </h1>
            </div>
            <div className={styles.container}>
                <div className={styles.blogContainer}>
                    {magazine.slice().reverse().map((blog, index) => (
                        (showAllBlogs || index < 2) && (
                            <div
                                key={index}
                                className={`${styles.blogPreview} ${styles.open}`}
                                ref={(el) => (blogRefs.current[index] = el as HTMLDivElement)}
                            >
                                <h2 className={styles.title}>{blog.title}</h2>
                                <p className={styles.description}>
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
                                            case 'Ethereum':
                                                topicClass = styles.ethereum;
                                                break;
                                            case `L2's`:
                                                topicClass = styles.ltwo;
                                                break;
                                            case 'AI':
                                                topicClass = styles.ai;
                                                break;
                                            case 'Tokenomics':
                                                topicClass = styles.tokenomics;
                                                break;
                                            case 'RWA':
                                                topicClass = styles.rwa;
                                                break;
                                            case 'Privacy':
                                                topicClass = styles.privacy;
                                                break;
                                            case 'Scalability':
                                                topicClass = styles.scalability;
                                                break;
                                            case 'Zero-Knowledge Proofs':
                                                topicClass = styles.zkProofs;
                                                break;
                                            case 'Cryptography':
                                                topicClass = styles.cryptography;
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
                        )
                    ))}
                </div>
                {selectedBlog !== null && showFullPage && (
                    <BlogFullPage selectedBlog={selectedBlog} onClose={handleCloseFullView} />
                )}

            </div>
            <div className={styles.buttonContainer}>
                {!showAllBlogs && (
                    <button
                        className={styles.viewBlogs}
                        onClick={handleViewAllBlogs}
                    >
                        View More...
                    </button>
                )}
                {showAllBlogs && (
                    <button
                        className={styles.hideBlogs}
                        onClick={handleHideBlogs}
                    >
                        View Less...
                    </button>
                )}
            </div>
        </>
    );
};

export default BlogComponent;
