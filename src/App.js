import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

export const Home = () => <h1>Home</h1>;
export const About = () => <h1>About</h1>;

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto my-5" style={{ height: '80vh' }}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
