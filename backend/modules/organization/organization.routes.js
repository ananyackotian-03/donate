const express = require('express');
const router = express.Router();

const { 
  createOrganization, 
  getAllOrganizations, 
  getOrganizationById,
  getMyOrganization,
  getAllOrganizationsAdmin,
  verifyOrganization,
  addMember,
  removeMember,
  getMembers
} = require('./organization.controller');
const authMiddleware = require('../../src/middleware/authMiddleware');

// POST - Create Organization
router.post('/', authMiddleware, createOrganization);

// GET - My Organization (must be BEFORE /:id)
router.get('/my', authMiddleware, getMyOrganization);

// ADMIN ROUTES
router.get('/admin/all', authMiddleware, getAllOrganizationsAdmin);
router.put('/admin/:id/verify', authMiddleware, verifyOrganization);

// TEAM MANAGEMENT ROUTES
router.post('/:id/members', authMiddleware, addMember);
router.delete('/:id/members/:userId', authMiddleware, removeMember);
router.get('/:id/members', authMiddleware, getMembers);

// GET - All Verified Organizations
router.get('/', getAllOrganizations);

// GET - Organization By ID
router.get('/:id', getOrganizationById);

module.exports = router;
