import { useEffect } from "react";
import BlogComponent from "../../components/blog/BlogComponent"
import { useWindowScroll } from "../../hooks/useWindowScroll";
import Navigation from "../../components/navigation/Navigation";
import Hero from "../../components/hero/Hero";
import HeroTitle from "../../components/heroTitle/HeroTitle";
import Footer from "../../components/footer/Footer";
const Blogs = () => {
    const { scrollPosition, resetWindowPosition } = useWindowScroll();
    useEffect(() => {
        if (scrollPosition.y > 0)
            resetWindowPosition();
    }, []);
    return (
        <>
            <Navigation />
            <Hero section={'blogs'} />
            <HeroTitle title={'blogs'} />
            <BlogComponent isUsingDescription={true} />
            <Footer copyrightText="Trevor Sykes - 2025" />
        </>
    )
}
export default Blogs