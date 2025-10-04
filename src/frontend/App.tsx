import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import MessagesPage from './pages/MessagesPage';
import ForumPage from './pages/ForumPage';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (token) {
      fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar user={user} onLogout={() => setUser(null)} theme={theme} onToggleTheme={toggleTheme} />
        <main style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={setUser} />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage onRegister={setUser} />} />
            <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/profile/:username" element={<ProfilePage currentUser={user} />} />
            <Route path="/posts" element={<PostsPage user={user} />} />
            <Route path="/posts/:slug" element={<PostDetailPage user={user} />} />
            <Route path="/posts/create" element={user ? <CreatePostPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/projects" element={<ProjectsPage user={user} />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage user={user} />} />
            <Route path="/messages" element={user ? <MessagesPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/forum" element={<ForumPage user={user} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
