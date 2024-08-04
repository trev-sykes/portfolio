import { useState, useEffect } from 'react';
import Loading from './components/loading/Loading';
import Github from './components/github/GithubLink';
import Header from './components/header/Header';
import Hero from './containers/hero/Hero';
import Blog from './containers/blog/Blog';
import Footer from './components/footer/Footer';

function App() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    // Remove the DOMContentLoaded listener and handle loading state directly
    const handleLoad = () => setIsLoading(false);

    // Simulate loading with a delay, if needed
    const timerId = setTimeout(handleLoad, 1000);

    return () => clearTimeout(timerId); // Cleanup timer on component unmount
  }, []);

  useEffect(() => {
    // Look for and remove the kins-kins-popup element
    const intervalId = setInterval(() => {
      const kinsKins = document.querySelector('#kins-kins-popup');
      if (kinsKins) {
        kinsKins.remove();
        clearInterval(intervalId); // Clear interval if kinsKins is found and removed
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ overflowY: 'scroll', opacity: '1', transition: 'opacity 2s ease' }}>
          <Github />
          <Header />
          <Hero />
          <Blog />
          <Footer copyrightText="Trevor Sykes - 2024" />
        </div>
      )}
    </>
  );
}

export default App;
