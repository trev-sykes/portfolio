import React, { useState, useEffect, useRef, useCallback } from 'react';
import canvasImage from '../../assets/banner.jpeg';
import mugshotImage from '../../assets/hero2.jpeg';
import styles from './Banner.module.css';
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
interface MugshotStyles extends ImageStyles {
    borderRadius: string;
}

interface Debris {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    angle: number;
    color: string;
    velocity: number;
    trail: boolean;
    collisionTime?: number; // Optional property to track collision time
}

interface SpaceshipCircle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: number;
    angle: number;
    rotationSpeed: number;
    creationTime: number; // Timestamp when the spaceship was created
    lifetime: number;     // Lifetime in milliseconds
}

const Banner: React.FC = () => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const debrisRef = useRef<Debris[]>([]);
    const shootingStarsRef = useRef<ShootingStar[]>([]);
    const spaceshipCirclesRef = useRef<SpaceshipCircle[]>([]);
    const animationRef = useRef<number>(0);
    const handleReSize = () => {
        setViewportWidth(window.innerWidth);
    }

    const initializeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, []);

    const createDebris = useCallback(() => {
        const canvas = canvasRef.current;
        let numDebris = 0;
        if (!canvas) return;

        const debris: Debris[] = [];
        if (viewportWidth < 600) {
            numDebris = 100;
        } else if (viewportWidth >= 600) {
            numDebris = 500;
        }

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

    const createShootingStar = useCallback((): ShootingStar | null => {
        let shootingStarProbability = 0.01;
        if (viewportWidth < 600) {
            shootingStarProbability = 0.005;
        } else if (viewportWidth >= 600) {
            shootingStarProbability = 0.01;
        }
        const canvas = canvasRef.current;
        if (!canvas) return null;

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

    const distanceBetweenPoints = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const detectCollision = (star1: ShootingStar, star2: ShootingStar): boolean => {
        const distance = distanceBetweenPoints(star1.x, star1.y, star2.x, star2.y);
        const minDistance = star1.length / 2 + star2.length / 2; // Adjust based on your needs
        return distance < minDistance;
    };

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

    const moveDebris = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const debris = debrisRef.current;
        debris.forEach(fragment => {

            fragment.x -= fragment.velocity;
            if (fragment.x < 0) {
                fragment.x = canvas.width;
            }

            fragment.x -= fragment.velocity;
            if (fragment.x < 0) {
                fragment.x = canvas.width;
            }
        });

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

        const spaceshipCircles = spaceshipCirclesRef.current;
        spaceshipCirclesRef.current = spaceshipCircles.filter(circle => {
            if (Date.now() - circle.creationTime > circle.lifetime) {
                return false;
            }
            circle.x += circle.velocity * Math.cos(circle.angle);
            circle.y += circle.velocity * Math.sin(circle.angle);
            circle.angle += circle.rotationSpeed;
            if (circle.x < 0 || circle.y < 0 || circle.x > canvas.width || circle.y > canvas.height) {
                return false;
            }
            return true;
        });
    }, []);

    const drawExplosion = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(25, 25, 25, 0.1)';
        ctx.fill();
    };

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
                    if (timeElapsed < 50) { // Explosion lasts 500 milliseconds
                        drawExplosion(ctx, shootingStar.x, shootingStar.y);
                    } else {
                        shootingStar.color = 'rgba(255, 255, 255, 0.0)'; // Reset color after explosion
                        shootingStar.trail = false;
                    }
                }
            });

            const spaceshipCircles = spaceshipCirclesRef.current;
            spaceshipCircles.forEach(circle => {
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = circle.color;
                ctx.fill();
            });
        }
    }, []);

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
    const mugshotStyles: MugshotStyles = {
        width: '100%',
        height: '100%',
        backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.15) 70%), url(${mugshotImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%'
    }
    return (
        <div className={styles.container}>
            <div className={styles.bannerContainer}>
                <div className={styles.canvasContainer}>
                    <canvas ref={canvasRef} style={canvasStyles}></canvas>
                </div>
                <div className={styles.mugshotContainer}>
                    <div style={mugshotStyles} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
