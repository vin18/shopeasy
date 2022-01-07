import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto my-5" style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
