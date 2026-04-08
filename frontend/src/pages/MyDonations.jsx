import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { donationAPI } from '../utils/apiClient';
import './MyDonations.css';

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchMyDonations();
  }, [isAuthenticated, navigate]);

  const fetchMyDonations = async () => {
    try {
      setLoading(true);
      const response = await donationAPI.getMyDonations();
      if (response.data.success) {
        setDonations(response.data.donations || []);
      }
    } catch (err) {
      setError('Failed to load your donations');
      console.error('Error fetching donations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        await donationAPI.deleteDonation(id);
        setDonations(donations.filter(d => d._id !== id));
      } catch (err) {
        alert('Failed to delete donation: ' + err.response?.data?.message);
      }
    }
  };

  const filteredDonations = filter === 'all' 
    ? donations 
    : donations.filter(d => d.status === filter);

  if (loading) {
    return <div className="my-donations-page"><div className="loading">Loading your donations...</div></div>;
  }

  return (
    <div className="my-donations-page">
      <div className="my-donations-container">
        <div className="page-header">
          <Link to="/donor-dashboard" className="back-link">← Back to Dashboard</Link>
          <h1>📦 My Donations</h1>
          <p>Track and manage all your donations</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="filter-section">
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
          <button 
            className={`filter-btn ${filter === 'DONATED' ? 'active' : ''}`}
            onClick={() => setFilter('DONATED')}
          >
            Completed ({donations.filter(d => d.status === 'DONATED').length})
          </button>
        </div>

        {filteredDonations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No donations found</h3>
            <p>You haven't created any donations yet.</p>
            <Link to="/add-donation" className="btn btn-primary">Add Your First Donation</Link>
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
                  <p className="quantity">📦 Quantity: {donation.quantity}</p>
                  <p className="location">📍 {donation.location}</p>
                  <p className="description">{donation.description}</p>
                  
                  <div className="donation-footer">
                    <span className={`status-badge status-${donation.status?.toLowerCase()}`}>
                      {donation.status}
                    </span>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(donation._id)}
                    >
                      🗑️ Delete
                    </button>
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

    fetchMyDonations();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donation?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/donations/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setDonations(donations.filter(d => d._id !== id));
        alert('Donation deleted successfully');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete donation');
    }
  };

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
      <div className="my-donations-page">
        <div className="loading">Loading your donations...</div>
      </div>
    );
  }

  return (
    <div className="my-donations-page">
      <div className="my-donations-container">
        <Link to="/donor-dashboard" className="back-link">← Back to Dashboard</Link>

        <div className="donations-header">
          <h1>My Donations</h1>
          <p>Manage and track all your donations</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="add-new">
          <Link to="/add-donation" className="btn-add-donation">
            + Add New Donation
          </Link>
        </div>

        {donations.length === 0 ? (
          <div className="no-donations">
            <p>You haven't posted any donations yet</p>
            <Link to="/add-donation" className="btn-start">
              Start Donating Now
            </Link>
          </div>
        ) : (
          <div className="donations-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Posted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id}>
                    <td className="image-cell">
                      {donation.imageUrl ? (
                        <img 
                          src={`http://localhost:5000${donation.imageUrl}`} 
                          alt={donation.title}
                          className="thumbnail"
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </td>
                    <td className="item-name">{donation.title}</td>
                    <td>{donation.category.charAt(0).toUpperCase() + donation.category.slice(1)}</td>
                    <td className="text-center">{donation.quantity}</td>
                    <td>{donation.location}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(donation.status)}`}>
                        {getStatusLabel(donation.status)}
                      </span>
                    </td>
                    <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <Link to={`/donations/${donation._id}`} className="btn-view">
                        View
                      </Link>
                      <Link to={`/edit-donation/${donation._id}`} className="btn-edit">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(donation._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
