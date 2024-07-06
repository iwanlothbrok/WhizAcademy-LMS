import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './tailwind.css'; // Tailwind styles
import OperationsCard from './components/OperationsCard.jsx';
import mentorsCards from './components/database/mentorsCards.js';
import AddMentor from './components/Mentors/AddMentor.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mentors" element={<OperationsCard cards={mentorsCards} />} />
        <Route path='/mentors/add' element={<AddMentor />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
