import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Temporary placeholder components
const HomePage = () => (
  <div className="container">
    <h1 className="text-2xl font-bold text-center">Home Page - Tarot Cards</h1>
  </div>
);

const MyCardsPage = () => (
  <div className="container">
    <h1 className="text-2xl font-bold text-center">My Cards Page - Reading Helper</h1>
  </div>
);

const ReadingsPage = () => (
  <div className="container">
    <h1 className="text-2xl font-bold text-center">Readings Page - Combinations</h1>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="nav">
          <div className="nav-container">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/mycards" className="nav-link">My Cards</Link>
            <Link to="/readings" className="nav-link">Readings</Link>
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