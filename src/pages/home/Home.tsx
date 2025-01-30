import Github from "../../components/github/GithubLink"
import Hero from "../../components/hero/Hero"
import Navigation from "../../components/navigation/Navigation"
import HeroTitle from "../../components/heroTitle/HeroTitle";
import { HomeIntro } from "../../components/homeIntro/HomeIntro"
import ProjectsComponent from "../../components/projects/ProjectsComponent"
import BlogComponent from "../../components/blog/BlogComponent"
import Footer from "../../components/footer/Footer"
import { useEffect } from "react"
interface HomeProps {
    handleRouteChange?: any;
}
const Home: React.FC<HomeProps> = ({ handleRouteChange }) => {
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
            <ProjectsComponent section={'home'} />
            <Footer copyrightText="Trevor Sykes - 2025" />
        </>
    )
}
export default Home;