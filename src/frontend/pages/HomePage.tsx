import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

interface HomePageProps {
  user: any;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Build, Learn, and Collaborate with Developers Worldwide
          </h1>
          <p className="hero-subtitle">
            DevCom is the ultimate platform for developers to share knowledge, 
            collaborate on projects, and grow together as a community.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
                <Link to="/posts" className="btn btn-secondary btn-lg">
                  Explore Posts
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why DevCom?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Share Knowledge</h3>
              <p>Write articles, tutorials, and blog posts with markdown support and syntax highlighting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Collaborate on Projects</h3>
              <p>Create, manage, and contribute to open-source projects with integrated GitHub support.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Real-time Communication</h3>
              <p>Connect with developers through messaging, voice calls, and video chat.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Community Forums</h3>
              <p>Participate in discussions, ask questions, and help others grow.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Code Snippets</h3>
              <p>Share and fork code snippets with multi-language syntax highlighting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Build Your Reputation</h3>
              <p>Earn badges, reputation points, and showcase your skills to the community.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to join the community?</h2>
          <p>Start collaborating with thousands of developers today.</p>
          {!user && (
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Your Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
