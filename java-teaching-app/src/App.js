import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import LessonsPage from './LessonsPage';
import Lesson1Page from './Lesson1Page';  // Import the specific lesson page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lessons/1" element={<Lesson1Page />} />
          {/* Add routes for more lessons as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
