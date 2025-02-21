import GithubLink from "../../components/github/GithubLink";
import Navigation from "../../components/navigation/Navigation";
import Hero from "../../components/hero/Hero";
import HeroTitle from "../../components/heroTitle/HeroTitle";
import ProjectFullPage from "../../components/projects/ProjectsFullPage";
import Footer from "../../components/footer/Footer";
import ProjectLink from "../../components/projectLink/ProjectLink";
import { useParams } from 'react-router-dom';
import { useWindowScroll } from "../../hooks/useWindowScroll";
import { useEffect } from "react";
import { projects } from "../../components/projects/project";

const ProjectDescription: React.FC = () => {
    const { projectName } = useParams<{ projectName: string }>();
    const { scrollPosition, resetWindowPosition } = useWindowScroll();
    useEffect(() => {
        if (scrollPosition.y > 0)
            resetWindowPosition();
    }, []);
    const project = projects.find(
        (p) => {
            if (p.title == projectName)
                return encodeURIComponent(p.title == projectName)
        }
    );
    return (
        <>
            <GithubLink projectUrl={project ? project.links[1].url : ''} />
            <ProjectLink projectUrl={project ? project.links[0].url : ''} />
            <Navigation subSection={`${projectName}`} />
            <Hero section={`${projectName}`} />
            <HeroTitle title={`${projectName}`} />
            <ProjectFullPage />
            < Footer copyrightText="Trevor Sykes - 2025" />

        </>

    )

}
export default ProjectDescription;
