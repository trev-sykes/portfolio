import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from "./pages/about/About";
import { useRemoveKinKins } from './hooks/useClearKinKins';
import TransitionLayout from './components/transitionLayout/TransitionLayout';
import Projects from './pages/projects/Projects';
import ProjectFullPage from './components/projects/ProjectsFullPage';

function App() {
  useRemoveKinKins();

  return (
    <Router>
      <TransitionLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectName" element={<ProjectFullPage />} />
        </Routes>

      </TransitionLayout>
    </Router>
  );
}

export default App;
