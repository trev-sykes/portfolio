// SpaceThemeBanner.tsx
import { useEffect, useRef, useCallback } from 'react';
import { useViewportSize } from '../../hooks/useViewportSize';
import canvasImage from '../../assets/hero.jpeg';
import { SpaceAnimationEngine } from './SpaceAnimationEngine';



const SpaceThemeBanner = () => {
    const viewportSize = useViewportSize();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<SpaceAnimationEngine | null>(null);
    const animationRef = useRef<number>(0);

    const initializeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = viewportSize.width;
        canvas.height = viewportSize.height;

        engineRef.current = new SpaceAnimationEngine(canvas);
        engineRef.current.initializeDebris();
    }, [viewportSize]);

    const animate = useCallback(() => {
        if (!engineRef.current) return;

        animationRef.current = requestAnimationFrame(animate);
        engineRef.current.animate();
    }, []);

    const handleResize = useCallback(() => {
        if (!engineRef.current || !canvasRef.current) return;
        engineRef.current.resize(viewportSize.width, viewportSize.height);
    }, [viewportSize]);

    useEffect(() => {
        initializeCanvas();
        animate();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initializeCanvas, animate, handleResize]);

    const styles = {
        container: {
            marginTop: '54px',
            marginBottom: 0,
            width: '100%'
        },
        canvasContainer: {
            width: '1100px',
            margin: '0 auto',
            borderRadius: '9px'
        },
        canvas: {
            width: '100%',
            height: '100%',
            backgroundImage: `radial-gradient(circle at center, rgba(205,205, 205, 0.1) 0%, rgba(205, 205, 205, .15) 90%), url(${canvasImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    };

    return (
        <>
            <canvas ref={canvasRef} style={styles.canvas}></canvas>
        </>
    )
};

export default SpaceThemeBanner;