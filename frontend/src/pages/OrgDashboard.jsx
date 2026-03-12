import { useState, useEffect } from 'react';
import axios from 'axios';
import './OrgDashboard.css';

export default function OrganizationDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error('Failed to load donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);
  return (
    <div className="org-dashboard-page">
      <div className="org-dashboard-container">
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