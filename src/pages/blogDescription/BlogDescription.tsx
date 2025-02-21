
import Navigation from "../../components/navigation/Navigation";
import Hero from "../../components/hero/Hero";
import HeroTitle from "../../components/heroTitle/HeroTitle";
import Footer from "../../components/footer/Footer";
import { useParams } from 'react-router-dom';
import { useWindowScroll } from "../../hooks/useWindowScroll";
import { useEffect } from "react";
import BlogDescriptionFullPage from "../../components/blog/BlogDescriptIonFullPage";

const BlogDescription: React.FC = () => {
    const { blogName } = useParams<{ blogName: string }>();
    const { scrollPosition, resetWindowPosition } = useWindowScroll();
    useEffect(() => {
        if (scrollPosition.y > 0)
            resetWindowPosition();
    }, []);

    return (
        <>
            < Navigation subSection={`${blogName}`
            } />
            < Hero section={`${blogName}`} />
            < HeroTitle title={`${blogName}`} />
            <BlogDescriptionFullPage />
            <Footer copyrightText="Trevor Sykes - 2025" />

        </>

    )

}
export default BlogDescription;
