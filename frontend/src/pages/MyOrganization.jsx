import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { organizationAPI } from '../utils/apiClient';
import './MyOrganization.css';

export default function MyOrganization() {
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isOrganization } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOrganization) {
      navigate('/create-organization');
      return;
    }

    fetchMyOrganization();
  }, [isOrganization, navigate]);

  const fetchMyOrganization = async () => {
    try {
      setLoading(true);
      const response = await organizationAPI.getMyOrganization();
      if (response.data.success) {
        setOrg(response.data.data);
      } else if (response.status === 404) {
        // No organization yet
        navigate('/create-organization');
      }
    } catch (err) {
      if (err.response?.status === 404) {
        navigate('/create-organization');
      } else {
        setError('Failed to load your organization');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="my-org-page"><div className="loading">Loading organization...</div></div>;
  }

  if (!org) {
    return (
      <div className="my-org-page">
        <div className="no-org-container">
          <h2>No Organization Yet</h2>
          <p>Create your organization to start receiving donations</p>
          <Link to="/create-organization" className="btn btn-primary">Create Organization</Link>
        </div>
      </div>
    );
  }

  const statusColor = {
    'pending': '#ff9800',
    'verified': '#4caf50',
    'rejected': '#f44336'
  };

  return (
    <div className="my-org-page">
      <div className="my-org-container">
        <div className="page-header">
          <Link to="/organization" className="back-link">← Back to Dashboard</Link>
          <h1>🏢 My Organization</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="org-details">
          <div className="org-header">
            <h2>{org.name}</h2>
            <span 
              className="status-badge" 
              style={{ backgroundColor: statusColor[org.verificationStatus] || '#999' }}
            >
              {org.verificationStatus?.toUpperCase()}
            </span>
          </div>

          {org.verificationStatus === 'pending' && (
            <div className="info-message">
              ⏳ Your organization is pending admin verification. This usually takes 24-48 hours.
            </div>
          )}

          {org.verificationStatus === 'rejected' && org.rejectionReason && (
            <div className="error-message">
              ❌ Your organization was rejected. Reason: {org.rejectionReason}
            </div>
          )}

          <div className="org-info-grid">
            <div className="info-item">
              <label>Category:</label>
              <p>{org.category}</p>
            </div>
            <div className="info-item">
              <label>Registration Number:</label>
              <p>{org.registrationNo || 'N/A'}</p>
            </div>
            <div className="info-item">
              <label>Contact Email:</label>
              <p>{org.contactEmail}</p>
            </div>
            <div className="info-item">
              <label>Contact Phone:</label>
              <p>{org.contactPhone || 'N/A'}</p>
            </div>
          </div>

          <div className="org-description">
            <label>Description:</label>
            <p>{org.description}</p>
          </div>

          <div className="org-description">
            <label>Address:</label>
            <p>{org.address}</p>
          </div>

          {org.website && (
            <div className="org-description">
              <label>Website:</label>
              <a href={org.website} target="_blank" rel="noopener noreferrer">{org.website}</a>
            </div>
          )}

          <div className="org-stats">
            <div className="stat">
              <label>Members:</label>
              <p>{org.members?.length || 0}</p>
            </div>
            <div className="stat">
              <label>Created:</label>
              <p>{new Date(org.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {org.members && org.members.length > 0 && (
            <div className="org-members">
              <h3>👥 Team Members ({org.members.length})</h3>
              <ul>
                {org.members.map((member) => (
                  <li key={member._id}>
                    <span>{member.name}</span>
                    <span className="member-email">{member.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {org.verificationStatus === 'verified' && (
          <Link to="/organization" className="btn btn-primary">Go to Dashboard</Link>
        )}
      </div>
    </div>
  );
}

        if (response.data.success) {
          setOrganization(response.data.data);
          
          // Fetch members
          try {
            const membersRes = await axios.get(
              `http://localhost:5000/api/organizations/${response.data.data._id}/members`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );
            if (membersRes.data.success) {
              setMembers(membersRes.data.data);
            }
          } catch (err) {
            console.error('Error fetching members:', err);
          }
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setError('No organization found. Create one first.');
        } else {
          setError(err.response?.data?.message || 'Failed to load organization');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [navigate]);

  if (loading) {
    return (
      <div className="my-org-page">
        <div className="loading">Loading organization...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-org-page">
        <div className="my-org-container">
          <div className="error-section">
            <h2>{error}</h2>
            <Link to="/create-organization" className="btn-create-org">
              Create Organization
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="my-org-page">
        <div className="my-org-container">
          <div className="empty-section">
            <h2>No Organization</h2>
            <p>You don't have an organization yet. Create one to get started.</p>
            <Link to="/create-organization" className="btn-create-org">
              Create Organization
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending: '#fbbf24',
    verified: '#10b981',
    rejected: '#ef4444'
  };

  return (
    <div className="my-org-page">
      <div className="my-org-container">
        <div className="org-header">
          <h1>{organization.name}</h1>
          <span className="status-badge" style={{ backgroundColor: statusColors[organization.verificationStatus] }}>
            {organization.verificationStatus.toUpperCase()}
          </span>
        </div>

        <div className="org-info-grid">
          <div className="info-card">
            <h3>Organization Details</h3>
            <div className="info-item">
              <span className="label">Category:</span>
              <span className="value">{organization.category.toUpperCase()}</span>
            </div>
            <div className="info-item">
              <span className="label">Description:</span>
              <span className="value">{organization.description}</span>
            </div>
            <div className="info-item">
              <span className="label">Registration No:</span>
              <span className="value">{organization.registrationNo || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="label">Address:</span>
              <span className="value">{organization.address}</span>
            </div>
            <div className="info-item">
              <span className="label">Contact Email:</span>
              <span className="value">{organization.contactEmail}</span>
            </div>
            <div className="info-item">
              <span className="label">Contact Phone:</span>
              <span className="value">{organization.contactPhone || 'N/A'}</span>
            </div>
            {organization.website && (
              <div className="info-item">
                <span className="label">Website:</span>
                <a href={organization.website} target="_blank" rel="noopener noreferrer" className="value link">
                  {organization.website}
                </a>
              </div>
            )}
          </div>

          <div className="info-card">
            <h3>Status Info</h3>
            <div className="info-item">
              <span className="label">Verification Status:</span>
              <span className="value" style={{ color: statusColors[organization.verificationStatus] }}>
                {organization.verificationStatus}
              </span>
            </div>
            {organization.verifiedAt && (
              <div className="info-item">
                <span className="label">Verified On:</span>
                <span className="value">{new Date(organization.verifiedAt).toLocaleDateString()}</span>
              </div>
            )}
            {organization.rejectionReason && (
              <div className="info-item">
                <span className="label">Rejection Reason:</span>
                <span className="value error">{organization.rejectionReason}</span>
              </div>
            )}
            <div className="info-item">
              <span className="label">Active Status:</span>
              <span className="value">{organization.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            <div className="info-item">
              <span className="label">Total Members:</span>
              <span className="value">{members.length}</span>
            </div>
          </div>
        </div>

        {members.length > 0 && (
          <div className="members-section">
            <h2>Team Members</h2>
            <div className="members-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member._id}>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="action-buttons">
          <Link to="/organizations" className="btn-browse">
            Browse Other Organizations
          </Link>
          <Link to="/donor-dashboard" className="btn-back">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
