import Github from "../../components/github/GithubLink"
import { AboutMeHeader } from "../../components/about/AboutMeHeader"
import Banner from "../../components/banner/Banner"
import Header from "../../components/header/Header"
import { Introduction } from "../../components/introduction/Introduction"
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
            <Header />
            <Banner section={'home'} />
            <AboutMeHeader />
            <Introduction />
            <ProjectsComponent />
            <BlogComponent />
            <Footer copyrightText="Trevor Sykes - 2025" />
        </>
    )
}
export default Home