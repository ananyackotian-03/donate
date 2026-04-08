const Organization = require('./organization.model');
const User = require('../../src/models/User');

exports.createOrganization = async (req, res) => {
  try {
    // Auth Check - Only org_admin can create organizations
    if (req.user.role !== 'org_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only organization admins can create organizations'
      });
    }

    // Get User from DB
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent Duplicate Org - user can only manage one org
    if (user.organization) {
      return res.status(400).json({
        success: false,
        message: 'You already manage an organization'
      });
    }

    // Extract Data from Request
    const {
      name,
      description,
      category,
      registrationNo,
      address,
      contactEmail,
      contactPhone,
      website
    } = req.body;

    // Basic Validation
    if (!name || !description || !category || !address || !contactEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, description, category, address, contactEmail'
      });
    }

    // Create Organization
    const organization = await Organization.create({
      name,
      description,
      category,
      registrationNo,
      address,
      contactEmail,
      contactPhone,
      website,
      adminUser: req.user._id,
      members: [req.user._id]
    });

    // Link User → Organization
    user.organization = organization._id;
    await user.save();

    // Send Response
    return res.status(201).json({
      success: true,
      message: 'Organization created. Pending admin verification.',
      data: organization
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
