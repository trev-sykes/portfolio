import GithubLink from "../../components/github/GithubLink";
import Navigation from "../../components/navigation/Navigation";
import Hero from "../../components/hero/Hero";
import HeroTitle from "../../components/heroTitle/HeroTitle";
import ProjectFullPage from "../../components/projects/ProjectsFullPage";
import Footer from "../../components/footer/Footer";
import { useParams } from 'react-router-dom';
import { useWindowScroll } from "../../hooks/useWindowScroll";
import { useEffect } from "react";

const ProjectDescription: React.FC = () => {
    const { projectName } = useParams<{ projectName: string }>();
    const { scrollPosition, resetWindowPosition } = useWindowScroll();
    useEffect(() => {
        if (scrollPosition.y > 0)
            resetWindowPosition();
    }, []);

    return (
        <>
            <GithubLink />
            <Navigation subSection={`${projectName}`} />
            <Hero section={`${projectName}`} />
            <HeroTitle title={`${projectName}`} />
            <ProjectFullPage />
            < Footer copyrightText="Trevor Sykes - 2025" />

        </>

    )

}
export default ProjectDescription;
