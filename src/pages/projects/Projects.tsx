import GithubLink from "../../components/github/GithubLink";
import Navigation from "../../components/navigation/Navigation";
import Hero from "../../components/hero/Hero";
import HeroTitle from "../../components/heroTitle/HeroTitle";
import ProjectsComponent from "../../components/projects/ProjectsComponent";
import Footer from "../../components/footer/Footer";
const Projects: React.FC = () => {
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