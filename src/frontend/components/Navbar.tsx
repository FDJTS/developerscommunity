import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, theme, onToggleTheme }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="logo">DevCom</span>
        </Link>

        <div className="navbar-links">
          <Link to="/posts">Posts</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/forum">Forum</Link>
        </div>

        <div className="navbar-actions">
          <button onClick={onToggleTheme} className="btn-icon" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <>
              <Link to="/messages" className="btn-icon" title="Messages">
                💬
              </Link>
              <Link to="/dashboard" className="btn btn-secondary">
                Dashboard
              </Link>
              <Link to={`/profile/${user.username}`} className="navbar-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="avatar" />
                ) : (
                  <div className="avatar-placeholder">{user.username[0].toUpperCase()}</div>
                )}
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
