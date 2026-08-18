import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import MyLearning from './pages/MyLearning';
import Revision from './pages/Revision';
import Projects from './pages/Projects';
import InterviewPrep from './pages/InterviewPrep';
import Analytics from './pages/Analytics';
import People from './pages/People';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="lg:pl-[264px]">
        <Topbar onMenu={() => setNavOpen(true)} />
        <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/revision" element={<Revision />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/interview-prep" element={<InterviewPrep />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/people" element={<People />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="*"
              element={
                <div className="border-3 border-ink bg-card p-10 text-center shadow-nb">
                  <h1 className="font-display text-3xl uppercase">Timeline not found</h1>
                  <p className="mt-2 font-semibold text-muted">
                    That route does not exist in this universe.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
