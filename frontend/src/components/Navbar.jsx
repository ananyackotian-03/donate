import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout, isOrganization, isAdmin } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🤝</span>
          DaanSetu
        </Link>
        
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link btn-register" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link 
                  to={isOrganization || isAdmin ? '/my-organization' : '/donor-dashboard'} 
                  className="nav-link" 
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              
              {!isOrganization && !isAdmin && (
                <li className="nav-item">
                  <Link to="/add-donation" className="nav-link" onClick={() => setMenuOpen(false)}>
                    + Add Donation
                  </Link>
                </li>
              )}
              
              <li className="nav-item">
                <Link to="/view-donations" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Donations
                </Link>
              </li>
              
              {!isOrganization && !isAdmin && (
                <li className="nav-item">
                  <Link to="/create-organization" className="nav-link" onClick={() => setMenuOpen(false)}>
                    🏢 Create Org
                  </Link>
                </li>
              )}
              
              <li className="nav-item">
                <Link to="/notifications" className="nav-link" onClick={() => setMenuOpen(false)}>
                  🔔 Notifications
                </Link>
              </li>

              <li className="nav-item user-info">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">({user?.role})</span>
              </li>

              <li className="nav-item">
                <button 
                  onClick={handleLogout} 
                  className="nav-link btn-logout"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
