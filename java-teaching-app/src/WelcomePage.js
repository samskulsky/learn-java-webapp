import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Java Learning Platform</h1>
      <p className="text-lg mb-4">A free guide to the Java programming language.</p>
      <Link to="/lessons" className="btn">
        Start Learning
      </Link>
    </div>
  );
}

export default WelcomePage;
