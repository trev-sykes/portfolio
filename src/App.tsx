import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './pages/home/Home';
import Skills from './components/skills/Skills';
import { useRemoveKinKins } from './hooks/useClearKinKins';
import TransitionLayout from './components/transitionLayout/TransitionLayout';


function App() {
  useRemoveKinKins();

  return (
    <Router>
      <TransitionLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Skills />} />
        </Routes>
      </TransitionLayout>
    </Router>
  );
}

export default App;