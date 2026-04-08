import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { donationAPI } from '../utils/apiClient';
import './DonorDashboard.css';

export default function DonorDashboard() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    requested: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchMyDonations = async () => {
      try {
        setLoading(true);
        const response = await donationAPI.getMyDonations();

        if (response.data.success) {
          const allDonations = response.data.donations || [];
          setDonations(allDonations.slice(0, 5)); // Show last 5

          // Calculate stats
          const total = allDonations.length;
          const available = allDonations.filter(d => d.status === 'AVAILABLE').length;
          const requested = allDonations.filter(d => d.status === 'REQUESTED').length;
          const completed = allDonations.filter(d => d.status === 'DONATED').length;

          setStats({ total, available, requested, completed });
        }
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load donations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div className="dashboard-page"><div className="loading">Loading dashboard...</div></div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>📊 Donor Dashboard</h1>
          <p>Welcome, {user?.name}! Manage your donations and help organizations in need.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

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

          <Link to="/view-donations" className="dashboard-card">
            <div className="card-icon">🔍</div>
            <h2>Browse All Donations</h2>
            <p>Explore items available for request</p>
            <div className="card-arrow">→</div>
          </Link>

          <Link to="/create-organization" className="dashboard-card">
            <div className="card-icon">🏢</div>
            <h2>Create Organization</h2>
            <p>Register your organization with us</p>
            <div className="card-arrow">→</div>
          </Link>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Donations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.available}</div>
            <div className="stat-label">Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.requested}</div>
            <div className="stat-label">Requested</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        {!loading && donations.length > 0 && (
          <div className="recent-donations">
            <h2>📚 Your Recent Donations</h2>
            <div className="donations-list">
              {donations.map((donation) => (
                <div key={donation._id} className="donation-item">
                  {donation.imageUrl && (
                    <img 
                      src={`http://localhost:5000${donation.imageUrl}`} 
                      alt={donation.title}
                      className="donation-item-image"
                    />
                  )}
                  <div className="donation-info">
                    <h4>{donation.title}</h4>
                    <p className="category">📂 {donation.category}</p>
                    <p className="quantity">📦 Qty: {donation.quantity}</p>
                    <p className="location">📍 {donation.location}</p>
                  </div>
                  <span className={`status-badge status-${donation.status?.toLowerCase()}`}>
                    {donation.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && donations.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No donations yet</h3>
            <p>Start by adding a new donation!</p>
            <Link to="/add-donation" className="btn btn-primary">Add Donation</Link>
          </div>
        )}
      </div>
    </div>
  );
}