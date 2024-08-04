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

    const handleLoad = () => {

        setIsLoading(false);
    }

    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
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
      {loading && <Loading />}
      <div style={{ overflowY: loading ? 'hidden' : 'scroll', opacity: loading ? '0' : '1', display: loading ? 'none' : 'block', transition: 'opacity 2s ease' }}>
        <Github />
        <Header />
        <Hero />
        <Blog />
        <Footer copyrightText="Trevor Sykes - 2024" />
      </div>
    </>
  );
}

export default App;
