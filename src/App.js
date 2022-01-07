import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div
        className="container mx-auto my-5 px-32"
        style={{ minHeight: '80vh' }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
