import Github from './components/github/GithubLink';
import Header from './components/header/Header';
import Hero from './containers/hero/Hero';
import Blog from './containers/blog/Blog';
import Project from './containers/project/Project';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Github />
      <Header />
      <Hero />
      <Blog />
      <Project />
      <Footer copyrightText="Trevor Sykes - 2024" />
    </>
  );
}

export default App;
