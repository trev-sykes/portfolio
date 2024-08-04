import { useState, useEffect } from 'react';
import Loading from './components/loading/Loading';
import Github from './components/github/GithubLink';
import Header from './components/header/Header';
import Hero from './containers/hero/Hero';
import Blog from './containers/blog/Blog';
import Footer from './components/footer/Footer';

function App() {
  const [loading, setIsLoading] = useState(true);

  const loadingStyle: React.CSSProperties = {
        transition: 'background 2s ease',
        background: 'linear-gradient(to left, yellow 100%, black)'  
};

  useEffect(() => {
    // Simulate a loading delay

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust this value as needed

    // Clean up the timeout if the component unmounts before it completes
    return () => clearTimeout(loadingTimeout);
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
      {loading && <Loading loadingStyle={loadingStyle} />}
      <div style={{ opacity: loading ? '0' : '1', transition: 'opacity 1s ease' }}>
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
