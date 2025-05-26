import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import UnderTheHood from './pages/UnderTheHood/UnderTheHood';
import GenerationDetail from './pages/GenerationDetail/GenerationDetail';
import PageTransition from './components/PageTransition/PageTransition';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/under-the-hood" element={<UnderTheHood />} />
              <Route path="/generation/:id" element={<GenerationDetail />} />
            </Routes>
          </PageTransition>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
