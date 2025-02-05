import Github from "../../components/github/GithubLink"
import Hero from "../../components/hero/Hero"
import Navigation from "../../components/navigation/Navigation"
import HeroTitle from "../../components/heroTitle/HeroTitle";
import { HomeIntro } from "../../components/homeIntro/HomeIntro"
import BlogComponent from "../../components/blog/BlogComponent"
import Footer from "../../components/footer/Footer"
import { useEffect } from "react"
import { useWindowScroll } from "../../hooks/useWindowScroll";
interface HomeProps {
    handleRouteChange?: any;
}
const Home: React.FC<HomeProps> = ({ handleRouteChange }) => {
    const { scrollPosition, resetWindowPosition } = useWindowScroll();
    useEffect(() => {
        if (scrollPosition.y > 0)
            resetWindowPosition();
    }, []);

    useEffect(() => {
        if (handleRouteChange)
            handleRouteChange();
    }, [])
    return (
        <>
            <Github />
            <Navigation />
            <Hero section={'home'} />
            <HeroTitle title={'Home'} />
            <HomeIntro />
            <BlogComponent />
            <Footer copyrightText="Trevor Sykes - 2025" />
        </>
    )
}
export default Home;