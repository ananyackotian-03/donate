import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyDonations.css';

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/donations/my-donations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setDonations(response.data.donations);
        }
      } catch (err) {
        // If my-donations endpoint doesn't exist, try to get all and filter
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/api/donations', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.data.success) {
            setDonations(response.data.donations);
          }
        } catch (error) {
          setError('Failed to load your donations');
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

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
