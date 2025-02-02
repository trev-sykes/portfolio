import Github from "../../components/github/GithubLink"
import Navigation from '../../components/navigation/Navigation';
import Hero from '../../components/hero/Hero';
import HeroTitle from "../../components/heroTitle/HeroTitle";
import { AboutIntro } from "../../components/aboutIntro/AboutIntro";
import Footer from '../../components/footer/Footer';
import AboutMain from "../../components/aboutMain/AboutMain";
const About: React.FC = () => {

    return (
        <>
            <Github />
            <Navigation />
            <Hero section={'about'} />
            <HeroTitle title={'About'} />
            <AboutIntro />
            <AboutMain />
            <Footer copyrightText='Trevor Sykes - 2025' />
        </>
    )
}
export default About