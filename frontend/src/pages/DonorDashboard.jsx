import { Link } from 'react-router-dom';
import './DonorDashboard.css';

export default function DonorDashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Donor Dashboard</h1>
          <p>Welcome! Manage your donations and help organizations in need.</p>
        </div>

        <div className="dashboard-grid">
          <Link to="/add-donation" className="dashboard-card">
            <div className="card-icon">📝</div>
            <h2>Add Donation</h2>
            <p>Post a new item you'd like to donate</p>
            <div className="card-arrow">→</div>
          </Link>

          <Link to="/my-donations" className="dashboard-card">
            <div className="card-icon">📦</div>
            <h2>View My Donations</h2>
            <p>Track the status of your donations</p>
            <div className="card-arrow">→</div>
          </Link>

          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h2>Donation Status</h2>
            <p>View overall donation statistics</p>
            <div className="card-arrow">→</div>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div className="stat-label">Total Donations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2</div>
            <div className="stat-label">Pending Requests</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}