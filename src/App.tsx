import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyCardsPage from './pages/MyCardsPage';
import ReadingsPage from './pages/ReadingsPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="nav">
          <div className="nav-container">
            <Link to="/" className="nav-link">Начало</Link>
            <Link to="/mycards" className="nav-link">Моите карти</Link>
            <Link to="/readings" className="nav-link">Комбинации</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mycards" element={<MyCardsPage />} />
          <Route path="/readings" element={<ReadingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;