const express = require('express');
const router = express.Router();

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
} = require('./notification.controller');

const authMiddleware = require('../../src/middleware/authMiddleware');

// GET - All notifications
router.get('/', authMiddleware, getNotifications);

// GET - Unread count
router.get('/unread-count', authMiddleware, getUnreadCount);

// PUT - Mark single notification as read
router.put('/:id/read', authMiddleware, markAsRead);

// PUT - Mark all as read
router.put('/read-all', authMiddleware, markAllAsRead);

module.exports = router;
