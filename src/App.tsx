import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from "./pages/about/About";
import { useRemoveKinKins } from './hooks/useClearKinKins';
import TransitionLayout from './components/transitionLayout/TransitionLayout';
import Blogs from './pages/blogs/Blogs';
import BlogDescription from './pages/blogDescription/BlogDescription';
import Projects from './pages/projects/Projects';
import ProjectDescription from './pages/projectDescription/ProjectDescription';

function App() {
  useRemoveKinKins();

  return (
    <Router>
      <TransitionLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/:projectName" element={<ProjectDescription />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/:blogName" element={<BlogDescription />} />
        </Routes>


      </TransitionLayout>
    </Router>
  );
}

export default App;
