import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewDonations.css';

export default function ViewDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/donations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDonations(response.data);
      } catch (err) {
        setError('Failed to load donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Requested':
        return 'status-requested';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className="view-donations-page">
      <div className="view-donations-container">
        <Link to="/donor-dashboard" className="back-link">← Back to Dashboard</Link>

        <div className="donations-header">
          <h1>My Donations</h1>
          <p>Track and manage all your donations</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading donations...</div>
        ) : (
          <>
            <div className="donations-grid">
              {donations.map((donation) => (
                <div key={donation.id} className="donation-card">
                  <div className="card-header">
                    <h3>{donation.itemName}</h3>
                    <span className={`status-badge ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>

                  <div className="card-body">
                    <div className="donation-info">
                      <div className="info-item">
                        <span className="label">Category:</span>
                        <span className="value">{donation.category}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Quantity:</span>
                        <span className="value">{donation.quantity}</span>
                      </div>
                    </div>

                    <div className="donation-info">
                      <div className="info-item">
                        <span className="label">Location:</span>
                        <span className="value">📍 {donation.location}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Date Added:</span>
                        <span className="value">📅 {donation.dateAdded}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="add-new-donation">
              <Link to="/add-donation" className="btn-add-donation">+ Add New Donation</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
