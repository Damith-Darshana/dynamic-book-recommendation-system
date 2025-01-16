import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Recommendation from './components/Recommendation';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import LoginForm from './components/LoginForm';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
