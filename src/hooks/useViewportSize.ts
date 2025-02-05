import { useState, useEffect } from 'react';

// Tracks the users viewport width and height.
// Good for breakpoints in UI to handle different screens.
export const useViewportSize = () => {
    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleSizeChange = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleSizeChange);

        return () => window.removeEventListener('resize', handleSizeChange);

    }, []);

    return viewportSize;
}