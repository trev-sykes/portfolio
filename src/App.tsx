import Github from './components/github/GithubLink';
import Header from './components/header/Header';
import Hero from './containers/hero/Hero';
import Blog from './containers/blog/Blog';
import Footer from './components/footer/Footer';

function App() {
  let kinsKinsFound = false;
 let intervalId = setInterval(() => {
  let kinsKins = document.querySelector('#kins-kins-popup');
  if(kinsKins)
    kinsKins.remove();
    kinsKinsFound = true
    if(kinsKinsFound)
      clearInterval(intervalId);
  }, 1000);

  return (
    <>
      <Github />
      <Header />
      <Hero />
      <Blog />
      <Footer copyrightText="Trevor Sykes - 2024" />
    </>
  );
}

export default App;
