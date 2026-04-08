const express = require('express');
const router = express.Router();

const { 
  createOrganization, 
  getAllOrganizations, 
  getOrganizationById,
  getMyOrganization 
} = require('./organization.controller');
const authMiddleware = require('../../src/middleware/authMiddleware');

// POST - Create Organization
router.post('/', authMiddleware, createOrganization);

// GET - My Organization (must be BEFORE /:id)
router.get('/my', authMiddleware, getMyOrganization);

// GET - All Verified Organizations
router.get('/', getAllOrganizations);

// GET - Organization By ID
router.get('/:id', getOrganizationById);

module.exports = router;
