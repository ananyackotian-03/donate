import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { notificationAPI } from '../utils/apiClient';
import './Notifications.css';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationAPI.getNotifications();
      if (response.data.success) {
        setNotifications(response.data.data || []);
      }
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationAPI.deleteNotification(id);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (err) {
      alert('Failed to delete notification');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
    } catch (err) {
      alert('Failed to mark as read');
    }
  };

  if (loading) {
    return <div className="notifications-page"><div className="loading">Loading notifications...</div></div>;
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div className="page-header">
          <Link to="/donor-dashboard" className="back-link">← Back</Link>
          <h1>🔔 Notifications</h1>
          {unreadCount > 0 && <span className="unread-badge">{unreadCount} unread</span>}
        </div>

        {error && <div className="error-message">{error}</div>}

        {notifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No notifications yet</h3>
            <p>You'll see notifications here when something happens</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map((notif) => (
              <div 
                key={notif._id} 
                className={`notification-item ${!notif.isRead ? 'unread' : ''}`}
              >
                <div className="notification-content">
                  <h4>{notif.title}</h4>
                  <p>{notif.message}</p>
                  <span className="notification-type">📌 {notif.type}</span>
                  <span className="notification-date">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="notification-actions">
                  {!notif.isRead && (
                    <button 
                      className="btn-mark-read"
                      onClick={() => handleMarkAsRead(notif._id)}
                    >
                      ✓ Mark as Read
                    </button>
                  )}
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(notif._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
        }
      );

      if (response.data.success) {
        setNotifications(response.data.data || []);
        const unread = (response.data.data || []).filter(n => !n.isRead).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notifications');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Update local state
      setNotifications(prev =>
        prev.map(n =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/notifications/read-all',
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Update local state
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      'donation_requested': '📝',
      'request_confirmed': '✅',
      'request_rejected': '❌',
      'donation_delivered': '📦',
      'org_verified': '✓',
      'org_rejected': '✗',
      'new_member': '👥'
    };
    return icons[type] || '📢';
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      'donation_requested': '#3b82f6',
      'request_confirmed': '#10b981',
      'request_rejected': '#ef4444',
      'donation_delivered': '#f59e0b',
      'org_verified': '#10b981',
      'org_rejected': '#ef4444',
      'new_member': '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="notifications-page">
        <div className="loading">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div className="notifications-header">
          <div className="header-top">
            <h1>Notifications</h1>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount} Unread</span>
            )}
          </div>
          {notifications.length > 0 && unreadCount > 0 && (
            <button onClick={handleMarkAllAsRead} className="btn-mark-all">
              Mark All as Read
            </button>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        {notifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No Notifications</h2>
            <p>You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                onClick={() => {
                  if (!notification.isRead) {
                    handleMarkAsRead(notification._id);
                  }
                }}
              >
                <div className="notification-icon">
                  {getTypeIcon(notification.type)}
                </div>

                <div className="notification-content">
                  <div className="notification-title">
                    <h3>{notification.title}</h3>
                    <span
                      className="type-badge"
                      style={{ backgroundColor: getTypeBadgeColor(notification.type) }}
                    >
                      {notification.type.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  <div className="notification-meta">
                    <span className="timestamp">
                      {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </span>
                    {!notification.isRead && (
                      <span className="read-indicator">New</span>
                    )}
                  </div>
                </div>

                {!notification.isRead && (
                  <div className="unread-dot"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
