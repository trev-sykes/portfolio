import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Banner.module.css';

interface Star {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: number;
}

const Banner: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animationRef = useRef<number>(0);

    const initializeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, []);

    const createStars = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const stars: Star[] = [];
        const numStars = 1000;
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                color: `rgba(255, 255, 255, ${Math.random()})`,
                velocity: Math.random() + 0.1, // Add velocity for parallax effect
            });
        }
        starsRef.current = stars;
    }, []);

    const moveStars = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const stars = starsRef.current;
        stars.forEach(star => {
            star.x -= star.velocity; // Move stars horizontally for parallax effect
            if (star.x < 0) {
                star.x = canvas.width;
            }
        });
    }, []);

    const drawStars = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const stars = starsRef.current;
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.fill();
            });
        }
    }, []);

    const animateStars = useCallback(() => {
        animationRef.current = requestAnimationFrame(animateStars);
        moveStars();
        drawStars();
    }, [drawStars, moveStars]);

    const handleResize = useCallback(() => {
        initializeCanvas();
        createStars();
    }, [initializeCanvas, createStars]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        initializeCanvas();
        createStars();
        animateStars();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initializeCanvas, createStars, animateStars, handleResize]);

    return (
        <div className={styles.container}>
            <div className={styles.bannerContainer}>
                <div className={styles.canvasContainer}>
                    <canvas className={styles.canvas} ref={canvasRef}></canvas>
                </div>
                <div className={styles.mugshotContainer}>
                    <div className={styles.mugshot} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
