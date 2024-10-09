import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobPostingsPage from './pages/JobPostingsPage';
import JobPostingDetailPage from './pages/JobPostingDetailPage';
import NewJobPostingPage from './pages/NewJobPostingPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/job-postings" element={<JobPostingsPage />} />
            <Route path="/job-postings/new" element={<NewJobPostingPage />} />
            <Route path="/job-postings/:id" element={<JobPostingDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;