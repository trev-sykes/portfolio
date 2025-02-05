import { useState, useEffect } from 'react'

export const useWindowScroll = () => {
    const [scrollPosition, setScrollPosition] = useState({
        x: window.scrollX,
        y: window.scrollY
    });

    useEffect(() => {
        const handleScrollMove = () => {
            setScrollPosition({
                x: window.scrollX,
                y: window.scrollY
            });
        }
        window.addEventListener('scroll', handleScrollMove);

        return () => window.removeEventListener('scroll', handleScrollMove);
    }, []);
    const resetWindowPosition = () => {
        window.scrollTo(0, 0);
    }

    return { scrollPosition, resetWindowPosition };
}