import React, { useState, useEffect, useRef, useCallback } from 'react';
import canvasImage from '../../assets/hero.jpeg';
import homepageMugshotImage from '../../assets/logo.png';
import projectpageMugshotImage from "../../assets/project_hero.png";
import styles from './Hero.module.css';

/**
 * Defines the structure for image styling properties.
 * Used as a base interface for both canvas and mugshot styling.
 */
interface ImageStyles {
    width: string;
    height: string;
    backgroundImage: string;
    backgroundSize: string;
    backgroundPosition: string;
    backgroundRepeat: string;
}

interface CanvasStyles extends ImageStyles {
}
interface HomepageMugshotStyles extends ImageStyles {
    borderRadius: string;
}
interface ProjectpageMugshotStyles extends ImageStyles {
    borderRadius: string;
    transform: string;
}
/**
 * Represents a particle in the space debris field.
 * These particles create the background star effect in the animation.
 */
interface Debris {
    x: number;          // Horizontal position
    y: number;          // Vertical position
    radius: number;     // Size of the debris particle
    color: string;      // RGBA color value with opacity
    velocity: number;   // Movement speed
}

/**
 * Defines properties for shooting star animations.
 * These create dynamic light streaks across the canvas.
 */
interface ShootingStar {
    x: number;          // Starting x position
    y: number;          // Starting y position
    length: number;     // Length of the shooting star trail
    angle: number;      // Direction of movement in radians
    color: string;      // RGBA color value
    velocity: number;   // Movement speed
    trail: boolean;     // Whether to render a trailing effect
    collisionTime?: number;  // Timestamp of collision for animation effects
}
interface HeroProps {
    section: string;
}
/**
 * Banner component that renders an animated space scene with debris and shooting stars.
 * Provides a dynamic background effect with collision detection and responsive behavior.
 */
const Hero: React.FC<HeroProps> = ({ section }) => {
    // Tracks viewport width for responsive adjustments
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const debrisRef = useRef<Debris[]>([]);
    const shootingStarsRef = useRef<ShootingStar[]>([]);
    const animationRef = useRef<number>(0);

    /**
  * Updates viewport width state when window is resized.
  * Ensures animations remain responsive to screen size changes.
  */
    const handleReSize = () => {
        setViewportWidth(window.innerWidth);
    }

    /**
 * Sets up the canvas dimensions to match the viewport.
 * Essential for maintaining proper scaling and animation boundaries.
 */

    const initializeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, []);

    /**
     * Generates the initial debris field based on viewport width.
     * Creates more particles for larger screens to maintain visual density.
     */
    const createDebris = useCallback(() => {
        const canvas = canvasRef.current;
        let numDebris = 0;
        if (!canvas) return;
        // Initializes array of Debris, depending on the width of user screen
        const debris: Debris[] = [];
        if (viewportWidth < 600) {
            numDebris = 100;
        } else if (viewportWidth >= 600) {
            numDebris = 500;
        }
        // Pushes individual debris by giving then random position on x,y axies
        // random plot on x and y , random size, random color, random vel
        for (let i = 0; i < numDebris; i++) {
            debris.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                color: `rgba(255, 255, 255, ${Math.random() - 0.5})`,
                velocity: Math.random() + 0.1,
            });
        }

        debrisRef.current = debris;
    }, [viewportWidth]);


    /**
     * Generates new shooting stars with random properties.
     * Probability of creation varies based on viewport width to prevent overwhelming smaller screens.
     */
    const createShootingStar = useCallback((): ShootingStar | null => {
        // Probability per render
        // 1% chance for screens bigger than 600 width
        // 0.5% chance for screens smaller than 600 width
        let shootingStarProbability = 0.01;
        if (viewportWidth < 600) {
            shootingStarProbability = 0.005;
        } else if (viewportWidth >= 600) {
            shootingStarProbability = 0.01;
        }
        // Grabs the currently rendered canvas
        const canvas = canvasRef.current;
        if (!canvas) return null;
        // generating a random number from 0 to 1 exclusive, then comparing against our probability
        if (Math.random() < shootingStarProbability) { // Probability of creating a shooting star
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 30 + 10,
                angle: Math.random() * Math.PI * 2,
                color: `rgba(255, 255, 255, ${Math.random()})`,
                velocity: Math.random() * 5 + 2,
                trail: true
            };
        }
        return null;
    }, [viewportWidth]);

    /**
     * Calculates Euclidean distance between two points.
     * Used for collision detection between shooting stars.
     */
    const distanceBetweenPoints = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    /**
     * Determines if two shooting stars have collided based on their proximity.
     * Uses the stars' lengths to create a realistic collision boundary.
     */
    const detectCollision = (star1: ShootingStar, star2: ShootingStar): boolean => {
        const distance = distanceBetweenPoints(star1.x, star1.y, star2.x, star2.y);
        const minDistance = star1.length / 2 + star2.length / 2; // Adjust based on your needs
        return distance < minDistance;
    };

    /**
 * Manages collision effects between shooting stars.
 * Updates their properties to create visual feedback of the collision.
 */
    const handleCollision = (star1: ShootingStar, star2: ShootingStar) => {
        // Set collision time
        const currentTime = Date.now();
        star1.collisionTime = currentTime;
        star2.collisionTime = currentTime;

        // Adjust colors to red for explosion effect
        star1.color = 'rgba(255, 255, 255, .9)';
        star2.color = 'rgba(255, 255, 255, .9)';

        // Adjust directions and velocities
        const tempAngle = star1.angle;
        star1.angle = star2.angle;
        star2.angle = tempAngle;

        star1.velocity = Math.random() * 5 + 2;
        star2.velocity = Math.random() * 5 + 2;
    };

    /**
     * Updates positions of all debris and shooting stars.
     * Handles collision detection and cleanup of out-of-bounds objects.
     */
    const moveDebris = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        // Grabs debris array
        const debris = debrisRef.current;

        debris.forEach(fragment => {
            // Moves objects incrementally to the left horizontally 
            fragment.x -= fragment.velocity;
            if (fragment.x < 0) {
                fragment.x = canvas.width;
            }

            fragment.x -= fragment.velocity;
            if (fragment.x < 0) {
                fragment.x = canvas.width;
            }
        });
        // Handle shooting star collisions and movement
        const shootingStars = shootingStarsRef.current;
        for (let i = 0; i < shootingStars.length; i++) {
            for (let j = i + 1; j < shootingStars.length; j++) {
                if (detectCollision(shootingStars[i], shootingStars[j])) {
                    handleCollision(shootingStars[i], shootingStars[j]);
                }
            }
        }

        shootingStars.forEach(shootingStar => {
            shootingStar.x -= shootingStar.velocity * Math.cos(shootingStar.angle);
            shootingStar.y -= shootingStar.velocity * Math.sin(shootingStar.angle);
        });

        shootingStarsRef.current = shootingStars.filter(shootingStar =>
            shootingStar.x >= 0 && shootingStar.y >= 0 && shootingStar.x <= canvas.width && shootingStar.y <= canvas.height
        );

    }, []);
    /**
     * Renders explosion effect when shooting stars collide.
     * Creates a circular burst effect with fade-out animaition.
     */
    const drawExplosion = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(25, 25, 25, 0.1)';
        ctx.fill();
    };

    /**
   * Renders all visual elements on the canvas.
   * Handles drawing of debris, shooting stars, trails, and explosion effects.
   */

    const drawDebris = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const debris = debrisRef.current;
            debris.forEach(fragment => {
                ctx.beginPath();
                ctx.arc(fragment.x, fragment.y, fragment.radius, 0, Math.PI * 2);
                ctx.fillStyle = fragment.color;
                ctx.fill();
            });

            const shootingStars = shootingStarsRef.current;
            shootingStars.forEach(shootingStar => {
                if (shootingStar.trail) {
                    for (let i = 0; i < 10; i++) {
                        const alpha = 1 - i * 0.1;
                        ctx.beginPath();
                        ctx.moveTo(
                            shootingStar.x + (shootingStar.length * i / 10) * Math.cos(shootingStar.angle),
                            shootingStar.y + (shootingStar.length * i / 10) * Math.sin(shootingStar.angle)
                        );
                        ctx.lineTo(
                            shootingStar.x + (shootingStar.length * (i + 1) / 10) * Math.cos(shootingStar.angle),
                            shootingStar.y + (shootingStar.length * (i + 1) / 10) * Math.sin(shootingStar.angle)
                        );
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                } else {
                    ctx.beginPath();
                    ctx.moveTo(shootingStar.x, shootingStar.y);
                    ctx.lineTo(
                        shootingStar.x + shootingStar.length * Math.cos(shootingStar.angle),
                        shootingStar.y + shootingStar.length * Math.sin(shootingStar.angle)
                    );
                    ctx.strokeStyle = shootingStar.color;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                // Set explosion effect duration
                if (shootingStar.collisionTime) {
                    const timeElapsed = Date.now() - shootingStar.collisionTime;
                    if (timeElapsed < 1000) { // Explosion lasts 500 milliseconds
                        drawExplosion(ctx, shootingStar.x, shootingStar.y);
                    } else {
                        shootingStar.color = 'rgba(255, 255, 255, 0.0)'; // Reset color after explosion
                        shootingStar.trail = false;
                    }
                }
            });
        }
    }, []);
    /**
     * Main animation loop that coordinates all visual updates.
     * Manages the creation of new shooting stars and updates all animations.
     */
    const animateDebris = useCallback(() => {
        animationRef.current = requestAnimationFrame(animateDebris);
        // Add shooting stars and spaceship circles based on probability
        const newShootingStar = createShootingStar();
        if (newShootingStar) {
            shootingStarsRef.current.push(newShootingStar);
        }
        drawDebris();
        moveDebris(); // You likely want to call moveDebris here to update positions
    }, [drawDebris, moveDebris, createShootingStar]);

    const handleResize = useCallback(() => {
        initializeCanvas();
        createDebris();
    }, [initializeCanvas, createDebris]);

    useEffect(() => {
        initializeCanvas();
        createDebris();
        animateDebris();

        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', handleReSize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.addEventListener('resize', handleReSize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initializeCanvas, createDebris, animateDebris, handleResize, handleReSize]);
    const canvasStyles: CanvasStyles = {
        width: '100%',
        height: '100%',
        backgroundImage: `radial-gradient(circle at center, rgba(205,205, 205, 0.1) 0%, rgba(205, 205, 205, .15) 90%), url(${canvasImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
    const emojiStyles: any = {
        fontSize: '4.75rem',
        userSelect: 'none',
        textAlign: 'center',
        marginTop: section == 'about' || section == 'projects' ? '25px' : '0',
        marginBottom: '0',
        overFlow: 'hidden'
    }

    const containerStyles: any = {
        marginTop: '54px',
        marginBottom: section == 'about' ? '10px' : '75px'
    }
    const homepageMugshotStyles: HomepageMugshotStyles = {
        width: '100%',
        height: '100%',
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${homepageMugshotImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%'
    }
    const projectpageMugshotStyles: ProjectpageMugshotStyles = {
        width: '100%',
        height: '100%',
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(227, 183, 227,.05) 70%), url(${projectpageMugshotImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '0%',
        transform: 'translateY(-25px)',
    }
    return (
        <div style={containerStyles}>
            <div className={styles.bannerContainer}>
                <div className={styles.canvasContainer}>
                    <canvas ref={canvasRef} style={canvasStyles}></canvas>
                </div>
                <div className={styles.mugshotContainer}>
                    {section == 'home' && (<div style={homepageMugshotStyles} />)}
                    {section == 'about' && (
                        <div className={styles.emoji}>
                            <p style={emojiStyles}>👋</p>
                        </div>
                    )}
                    {section == 'projects' && (
                        <div style={projectpageMugshotStyles} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
