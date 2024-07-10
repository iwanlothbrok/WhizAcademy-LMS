import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './tailwind.css'; // Tailwind styles
import OperationsCard from './components/OperationsCard.jsx';
import { mentorsCards, title } from './components/database/mentorsCards.js';
import { studentCards, studentTitle } from './components/database/studentCards.js';

import AddMentor from './components/Mentors/AddMentor.jsx';
import ShowMentors from './components/Mentors/ShowMentors.jsx';
import Navigation from './components/Navigation.jsx';
import EditMentor from './components/Mentors/EditMentor.jsx';
import AddStudent from './components/Students/AddStudent.jsx';
import ShowStudents from './components/Students/ShowStudents.jsx';
import ExcelPage from './components/Students/ExcelViewer.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mentors" element={<OperationsCard cards={mentorsCards} title={title} />} />
        <Route path='/mentors/add' element={<AddMentor />} />
        <Route path='/mentors/all' element={<ShowMentors />} />
        <Route path='/edit-mentor/:id' element={<EditMentor />} />
        <Route path="/students" element={<OperationsCard cards={studentCards} title={studentTitle} />} />
        <Route path='/students/add' element={<AddStudent />} />
        <Route path='/students/all' element={<ShowStudents />} />
        <Route path='/roadmap/:id' element={<ExcelPage />} />


      </Routes>
    </Router>
  </React.StrictMode>
);
