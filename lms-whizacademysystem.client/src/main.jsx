// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './tailwind.css'; // Tailwind styles

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://amjfimqhdyvnpspxlbtx.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(supabaseKey);

import OperationsCard from './components/OperationsCard.jsx';
import { mentorsCards, title } from './components/database/mentorsCards.js';
import { studentCards, studentTitle } from './components/database/studentCards.js';
import { lessonsCards, lessonsTitle } from './components/database/lessonsCards.js';

import { paymentCards, PaymentTitle as paymentTitle } from './components/database/paymentCards.js';
import AddMentor from './components/Mentors/AddMentor.jsx';
import ShowMentors from './components/Mentors/ShowMentors.jsx';
import Navigation from './components/Navigation.jsx';
import EditMentor from './components/Mentors/EditMentor.jsx';
import AddStudent from './components/Students/AddStudent.jsx';
import EditStudent from './components/Students/EditStudent.jsx';
import ShowStudents from './components/Students/ShowStudents.jsx';
import ExcelPage from './components/Students/ExcelViewer.jsx';
import ImageGrid from './components/ImageGrid.jsx';
import DetailsStudent from './components/Students/DetailsStudent.jsx';
import AddPayment from './components/Payments/AddPayment.jsx';
import ShowPayments from './components/Payments/ShowPayments.jsx';
import Calendar from './components/Lessons/Calendar.jsx';
import ShowLessons from './components/Lessons/ShowLessons.jsx';
import AddRelative from './components/Relatives/AddRelative.jsx';
// import EventList from './components/Events/EventList.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<ImageGrid />} />
          {/* mentors */}
          <Route path="/mentors" element={<OperationsCard cards={mentorsCards} title={title} />} />
          <Route path='/mentors/add' element={<AddMentor />} />
          <Route path='/mentors/all' element={<ShowMentors />} />
          <Route path='/edit-mentor/:id' element={<EditMentor />} />
          {/* students */}
          <Route path="/students" element={<OperationsCard cards={studentCards} title={studentTitle} />} />
          <Route path='/students/add' element={<AddStudent />} />
          <Route path='/students/all' element={<ShowStudents />} />
          <Route path='/roadmap/:id' element={<ExcelPage />} />
          <Route path='/details/:id' element={<DetailsStudent />} />
          <Route path='/payment/add' element={<AddPayment />} />
          <Route path='/edit-student/:id' element={<EditStudent />} />
          {/* payments */}
          <Route path="/payment" element={<OperationsCard cards={paymentCards} title={paymentTitle} />} />
          <Route path="/payment/all" element={<ShowPayments />} />
          <Route path="/payment/add" element={<AddPayment />} />

          {/* lessons */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/lessons" element={<OperationsCard cards={lessonsCards} title={lessonsTitle} />} />
          <Route path="/lessons/all" element={<ShowLessons />} />

          {/* relatives */}
          <Route path="/relative/add" element={<AddRelative />} />

        </Routes>
      </Router>
    </SessionContextProvider>
  </React.StrictMode>
);
