import GithubLink from "../../components/github/GithubLink";
import Navigation from "../../components/navigation/Navigation";
import Hero from "../../components/hero/Hero";
import HeroTitle from "../../components/heroTitle/HeroTitle";
import ProjectsComponent from "../../components/projects/ProjectsComponent";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import { useWindowScroll } from "../../hooks/useWindowScroll";
const Projects: React.FC = () => {
    const { scrollPosition, resetWindowPosition } = useWindowScroll();
    useEffect(() => {
        if (scrollPosition.y > 0)
            resetWindowPosition();
    }, []);
    return (
        <>
            <GithubLink />
            <Navigation />
            <Hero section={'projects'} />
            <HeroTitle title={'Projects'} />
            <ProjectsComponent section={'projects'} />
            <Footer copyrightText="Trevor Sykes - 2025" />
        </>
    )
}
export default Projects;