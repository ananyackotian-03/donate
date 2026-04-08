import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewDonations.css';

export default function ViewDonations() {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donations');
        
        if (response.data.success) {
          setDonations(response.data.donations);
          setFilteredDonations(response.data.donations);
        } else {
          setError(response.data.message || 'Failed to load donations');
        }
      } catch (err) {
        setError('Failed to load donations');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Handle category filter
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredDonations(donations);
    } else {
      setFilteredDonations(
        donations.filter(d => d.category === selectedCategory)
      );
    }
  }, [selectedCategory, donations]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'status-available';
      case 'REQUESTED':
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
