import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { organizationAPI } from '../utils/apiClient';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending');
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (isAdmin) {
      fetchOrganizations();
    }
  }, [isAdmin]);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await organizationAPI.getAllOrganizationsAdmin();
      if (response.data.success) {
        setOrgs(response.data.data || []);
      }
    } catch (err) {
      setError('Failed to load organizations');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrgs = orgs.filter(o => o.verificationStatus === filter);

  const handleVerify = async (id, action, reason = '') => {
    try {
      await organizationAPI.verifyOrganization(id, { action, rejectionReason: reason });
      fetchOrganizations();
    } catch (err) {
      alert('Failed to ' + action + ' organization');
    }
  };

  if (loading) {
    return <div className="admin-dashboard-page"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <h1>🔐 Admin Dashboard</h1>
          <p>Manage organizations, donations, and users</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="admin-stats">
          <div className="stat-card">
            <label>Total Organizations:</label>
            <p>{orgs.length}</p>
          </div>
          <div className="stat-card">
            <label>Pending:</label>
            <p>{orgs.filter(o => o.verificationStatus === 'pending').length}</p>
          </div>
          <div className="stat-card">
            <label>Verified:</label>
            <p>{orgs.filter(o => o.verificationStatus === 'verified').length}</p>
          </div>
          <div className="stat-card">
            <label>Rejected:</label>
            <p>{orgs.filter(o => o.verificationStatus === 'rejected').length}</p>
          </div>
        </div>

        <div className="filter-tabs">
          <button 
            className={`tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            ⏳ Pending ({orgs.filter(o => o.verificationStatus === 'pending').length})
          </button>
          <button 
            className={`tab ${filter === 'verified' ? 'active' : ''}`}
            onClick={() => setFilter('verified')}
          >
            ✅ Verified ({orgs.filter(o => o.verificationStatus === 'verified').length})
          </button>
          <button 
            className={`tab ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            ❌ Rejected ({orgs.filter(o => o.verificationStatus === 'rejected').length})
          </button>
        </div>

        <div className="organizations-list">
          {filteredOrgs.length === 0 ? (
            <div className="empty-state">
              <p>No organizations in this category</p>
            </div>
          ) : (
            filteredOrgs.map((org) => (
              <div key={org._id} className="org-item">
                <div className="org-info">
                  <h3>{org.name}</h3>
                  <p className="category">📂 {org.category}</p>
                  <p className="admin">👤 Admin: {org.adminUser?.name}</p>
                  <p className="email">📧 {org.contactEmail}</p>
                </div>
                
                {filter === 'pending' && (
                  <div className="org-actions">
                    <button 
                      className="btn btn-approve"
                      onClick={() => handleVerify(org._id, 'approve')}
                    >
                      ✅ Approve
                    </button>
                    <button 
                      className="btn btn-reject"
                      onClick={() => {
                        const reason = prompt('Enter rejection reason:');
                        if (reason) handleVerify(org._id, 'reject', reason);
                      }}
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
            <div className="card-arrow">→</div>
          </div>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="stat-number">156</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-number">42</div>
            <div className="stat-label">Organizations</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-number">328</div>
            <div className="stat-label">Total Donations</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-number">89%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}