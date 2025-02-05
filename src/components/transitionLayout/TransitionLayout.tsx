import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

interface LoadingStyleProps {
    transition: string;
    background: string;
}
// Create a wrapper component to handle transitions
const TransitionLayout = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [contentOpacity, setContentOpacity] = useState(0);
    const [nextLocation, setNextLocation] = useState<string | null>(null);
    const navigate = useNavigate();

    const loadingStyle: LoadingStyleProps = {
        transition: 'background 1s ease',
        background: 'linear-gradient(to left, yellow 100%, black)',
    };

    useEffect(() => {
        // Initial page load
        const timer = setTimeout(() => {
            setIsLoading(false);
            setContentOpacity(1);
        }, 1250);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (nextLocation && contentOpacity === 0) {
            const navigationTimer = setTimeout(() => {
                navigate(nextLocation);
                setNextLocation(null);

                // Start fading in the new content
                setTimeout(() => {
                    setIsLoading(false);
                    setContentOpacity(1);
                }, 100);
            }, 1000); // Wait for fade out to complete

            return () => clearTimeout(navigationTimer);
        }
    }, [nextLocation, contentOpacity, navigate]);
    const handleScroll = useCallback((e: Event) => {
        e.preventDefault();
    }, []);

    // Handle initial scroll locking
    useEffect(() => {
        const setupPage = () => {
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', handleScroll, { passive: false });
            window.addEventListener('touchmove', handleScroll, { passive: false });
            window.addEventListener('scroll', handleScroll, { passive: false });

            setTimeout(() => {
                document.body.style.overflow = 'auto';
                window.removeEventListener('wheel', handleScroll);
                window.removeEventListener('touchmove', handleScroll);
                window.removeEventListener('scroll', handleScroll);
            }, 2500);
        };

        setupPage();

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
    }, [handleScroll]);


    return (
        <div style={{ position: 'relative' }}>
            {/* Loading overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: isLoading ? 1 : 0,
                    transition: 'opacity 1s ease',
                    pointerEvents: isLoading ? 'auto' : 'none',
                    zIndex: 10,
                }}
            >
                <Loading loadingStyle={loadingStyle} />
            </div>

            {/* Main content */}
            <div
                style={{
                    opacity: contentOpacity,
                    transition: 'opacity 1s ease',
                    visibility: contentOpacity === 0 ? 'hidden' : 'visible',
                }}
            >
                {children}
            </div>
        </div>
    );
};
export default TransitionLayout
