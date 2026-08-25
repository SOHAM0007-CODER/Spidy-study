import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import MyLearning from './pages/MyLearning';
import Revision from './pages/Revision';
import Projects from './pages/Projects';
import InterviewPrep from './pages/InterviewPrep';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Mission from './pages/Mission';
import PreQuiz from './pages/PreQuiz';
import Login from './pages/Login';
import Signup from './pages/Signup';

function AppShell({ session }) {
  const [navOpen, setNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('adaptlearn-sidebar') === 'true';
  });

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('adaptlearn-sidebar', next);
      return next;
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Sidebar session={session} open={navOpen} onClose={() => setNavOpen(false)} collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
      <div className={`transition-[padding] duration-200 ${sidebarCollapsed ? 'lg:pl-[0px]' : 'lg:pl-[264px]'}`}>
        <Topbar session={session} onMenu={() => setNavOpen(true)} />
        <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          <Outlet context={{ session }} />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={session ? <Navigate to="/" replace /> : <Signup />} />
      
      <Route element={<AppShell session={session} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/revision" element={<Revision />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/mission/:courseId" element={<Mission />} />
        <Route path="/pre-quiz" element={<PreQuiz />} />
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
      </Route>
    </Routes>
  );
}
