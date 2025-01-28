import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import Loading from './components/loading/Loading';
import Skills from './components/skills/Skills';
import { useRemoveKinKins } from './hooks/useClearKinKins';
function App() {
  useRemoveKinKins();
  const [loading, setIsLoading] = useState(true);
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
    <Router>

      {loading && <Loading loadingStyle={loadingStyle} />}
      <div style={{ opacity: loading ? '0' : '1', transition: 'opacity 1s ease' }}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<Skills />}></Route>
        </Routes>
      </div>
    </Router >
  );
}

export default App;