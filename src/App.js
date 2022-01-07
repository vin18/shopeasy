import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

const Home = () => <h1>Home</h1>
const About = () => <h1>About</h1>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
