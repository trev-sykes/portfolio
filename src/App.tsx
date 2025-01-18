import { useState, useEffect, useRef } from 'react';
import Loading from './components/loading/Loading';
import Github from './components/github/GithubLink';
import Header from './components/header/Header';
import Banner from "../src/components/banner/Banner";
import Footer from './components/footer/Footer';
import { Skills } from './components/skills/Skills';
// import { Goals } from './components/goals/Goals';
import { AboutMe } from '../src/components/about/AboutMe';
import { AboutMeHeader } from '../src/components/about/AboutMeHeader';
import BlogComponent from './components/blog/BlogComponent';
import ProjectsComponent from './components/projects/ProjectsComponent';
import { useRemoveKinKins } from './hooks/useClearKinKins';
function App() {
  useRemoveKinKins();
  const [loading, setIsLoading] = useState(true);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const loadingStyle: React.CSSProperties = {
    transition: 'background 2s ease',
    background: 'linear-gradient(to left, yellow 100%, black)'
  };


  useEffect(() => {
    // Disable scrolling immediately when the component mounts
    document.body.style.overflow = 'hidden';

    // Prevent default scroll behavior
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    // Add event listeners to multiple scroll-related events
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('scroll', preventScroll, { passive: false });

    // Simulate a loading delay
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);

      // Keep scroll prevention active for an additional 1 second
      const scrollPreventionTimeout = setTimeout(() => {
        // Re-enable scrolling
        document.body.style.overflow = 'auto';

        // Remove scroll prevention event listeners
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('scroll', preventScroll);
      }, 1500); // Additional 1 second after loading becomes false

      // Store the additional timeout for cleanup
      return () => clearTimeout(scrollPreventionTimeout);
    }, 3000);

    // Cleanup function
    return () => {
      clearTimeout(loadingTimeout);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

  return (
    <>
      {loading && <Loading loadingStyle={loadingStyle} />}
      <div style={{ opacity: loading ? '0' : '1', transition: 'opacity 1s ease' }}>
        <Github />
        <Header />
        <Banner />
        <AboutMeHeader />
        <AboutMe />
        <ProjectsComponent />
        <Skills skillsSectionRef={skillsSectionRef} />
        {/* <Goals /> */}
        <BlogComponent />
        <Footer copyrightText="Trevor Sykes - 2024" />
      </div>
    </>
  );
}

export default App;