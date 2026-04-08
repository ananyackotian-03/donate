import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './OrgDashboard.css';

export default function OrgDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="org-dashboard-page">
      <div className="org-dashboard-container">
        <div className="dashboard-header">
          <h1>🏢 Organization Dashboard</h1>
          <p>Welcome, {user?.name}! Manage your organization and donations.</p>
        </div>

        <div className="dashboard-grid">
          <Link to="/my-organization" className="dashboard-card">
            <div className="card-icon">📋</div>
            <h2>View Organization</h2>
            <p>View and manage your organization details</p>
            <div className="card-arrow">→</div>
          </Link>

          <Link to="/view-donations" className="dashboard-card">
            <div className="card-icon">🔍</div>
            <h2>Browse Donations</h2>
            <p>Find and request donations for your organization</p>
            <div className="card-arrow">→</div>
          </Link>

          <Link to="/notifications" className="dashboard-card">
            <div className="card-icon">🔔</div>
            <h2>Notifications</h2>
            <p>Check your notifications and updates</p>
            <div className="card-arrow">→</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
        <div className="org-dashboard-header">
          <h1>Organization Dashboard</h1>
          <p>Find and request items to help your community</p>
        </div>

        <div className="org-dashboard-grid">
          <div className="org-dashboard-card">
            <div className="card-icon">🔍</div>
            <h2>Browse Donations</h2>
            <p>Explore available items from generous donors</p>
            <div className="card-arrow">→</div>
          </div>

          <div className="org-dashboard-card">
            <div className="card-icon">�</div>
            <h2>Request Donation</h2>
            <p>Submit specific requests for needed items</p>
            <div className="card-arrow">→</div>
          </div>

          <div className="org-dashboard-card">
            <div className="card-icon">📊</div>
            <h2>Submit Impact Report</h2>
            <p>Share how donations have helped your community</p>
            <div className="card-arrow">→</div>
          </div>
        </div>

        <div className="org-stats">
          <div className="org-stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">Items Requested</div>
          </div>
          <div className="org-stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Items Received</div>
          </div>
          <div className="org-stat-card">
            <div className="stat-number">4</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
}