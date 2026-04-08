import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { donationAPI } from '../utils/apiClient';
import './ViewDonations.css';

export default function ViewDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchDonations();
  }, [category]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const params = category !== 'all' ? { category } : {};
      const response = await donationAPI.getAllDonations(params);
      if (response.data.success) {
        setDonations(response.data.donations || []);
      }
    } catch (err) {
      setError('Failed to load donations');
      console.error('Error fetching donations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = filter === 'all' 
    ? donations 
    : donations.filter(d => d.status === filter);

  if (loading) {
    return <div className="view-donations-page"><div className="loading">Loading donations...</div></div>;
  }

  return (
    <div className="view-donations-page">
      <div className="view-donations-container">
        <div className="page-header">
          <h1>🔍 Browse All Donations</h1>
          <p>Find items you need from our community</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="filters">
          <div className="filter-group">
            <label>Status:</label>
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({donations.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'AVAILABLE' ? 'active' : ''}`}
              onClick={() => setFilter('AVAILABLE')}
            >
              Available ({donations.filter(d => d.status === 'AVAILABLE').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'REQUESTED' ? 'active' : ''}`}
              onClick={() => setFilter('REQUESTED')}
            >
              Requested ({donations.filter(d => d.status === 'REQUESTED').length})
            </button>
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="books">📚 Books</option>
              <option value="clothing">👔 Clothing</option>
              <option value="electronics">💻 Electronics</option>
              <option value="furniture">🪑 Furniture</option>
              <option value="food">🍎 Food & Groceries</option>
              <option value="medical">⚕️ Medical Supplies</option>
              <option value="other">🎁 Other</option>
            </select>
          </div>
        </div>

        {filteredDonations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔭</div>
            <h3>No donations found</h3>
            <p>Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="donations-grid">
            {filteredDonations.map((donation) => (
              <div key={donation._id} className="donation-card">
                {donation.imageUrl && (
                  <img 
                    src={`http://localhost:5000${donation.imageUrl}`} 
                    alt={donation.title}
                    className="donation-image"
                  />
                )}
                <div className="donation-content">
                  <h3>{donation.title}</h3>
                  <p className="category">📂 {donation.category}</p>
                  <p className="quantity">📦 Qty: {donation.quantity}</p>
                  <p className="location">📍 {donation.location}</p>
                  <p className="donor">👤 By: {donation.donorId?.name}</p>
                  {donation.description && <p className="description">{donation.description}</p>}
                  
                  <div className="donation-footer">
                    <span className={`status-badge status-${donation.status?.toLowerCase()}`}>
                      {donation.status}
                    </span>
                    {isAuthenticated && (
                      <button className="btn-request" disabled>
                        {donation.status === 'AVAILABLE' ? '🙏 Request' : donation.status}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
        return 'status-requested';
      case 'CONFIRMED':
        return 'status-confirmed';
      case 'DONATED':
        return 'status-donated';
      default:
        return '';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="view-donations-page">
        <div className="loading">Loading donations...</div>
      </div>
    );
  }

  return (
    <div className="view-donations-page">
      <div className="view-donations-container">
        <Link to="/donor-dashboard" className="back-link">← Back to Dashboard</Link>

        <div className="donations-header">
          <h1>Available Donations</h1>
          <p>Browse and request donations from the community</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="filter-section">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="food">Food & Groceries</option>
            <option value="medical">Medical Supplies</option>
            <option value="other">Other</option>
          </select>
        </div>

        {filteredDonations.length === 0 ? (
          <div className="no-donations">
            <p>No donations available in this category</p>
          </div>
        ) : (
          <div className="donations-grid">
            {filteredDonations.map((donation) => (
              <div key={donation._id} className="donation-card">
                {donation.imageUrl && (
                  <div className="donation-image">
                    <img src={`http://localhost:5000${donation.imageUrl}`} alt={donation.title} />
                  </div>
                )}

                <div className="donation-card-header">
                  <h3>{donation.title}</h3>
                  <span className={`status-badge ${getStatusColor(donation.status)}`}>
                    {getStatusLabel(donation.status)}
                  </span>
                </div>

                <div className="donation-info">
                  <p><strong>Category:</strong> {donation.category.charAt(0).toUpperCase() + donation.category.slice(1)}</p>
                  <p><strong>Quantity:</strong> {donation.quantity}</p>
                  <p><strong>Location:</strong> {donation.location}</p>
                  {donation.donorId && (
                    <p><strong>Donor:</strong> {donation.donorId.name}</p>
                  )}
                </div>

                {donation.description && (
                  <div className="donation-description">
                    <p>{donation.description}</p>
                  </div>
                )}

                <div className="donation-footer">
                  <small>
                    Posted on {new Date(donation.createdAt).toLocaleDateString()}
                  </small>
                  <Link to={`/donations/${donation._id}`} className="btn-view-details">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
