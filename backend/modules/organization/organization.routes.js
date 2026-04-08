const express = require('express');
const router = express.Router();

const { createOrganization } = require('./organization.controller');
const authMiddleware = require('../../src/middleware/authMiddleware');

// POST - Create Organization
router.post('/', authMiddleware, createOrganization);

module.exports = router;
