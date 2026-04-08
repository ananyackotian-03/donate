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

// GET ALL VERIFIED ORGANIZATIONS
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({
      verificationStatus: 'verified',
      isActive: true
    }).select('-documents'); // hide heavy data

    res.status(200).json({
      success: true,
      data: organizations
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// GET ORGANIZATION BY ID
exports.getOrganizationById = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id)
      .populate('adminUser', 'name email')
      .populate('members', 'name email');

    if (!org) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }

    res.status(200).json({
      success: true,
      data: org
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// GET MY ORGANIZATION (LOGGED IN USER)
exports.getMyOrganization = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.organization) {
      return res.status(404).json({
        success: false,
        message: 'You are not part of any organization'
      });
    }

    const org = await Organization.findById(user.organization)
      .populate('adminUser', 'name email')
      .populate('members', 'name email');

    res.status(200).json({
      success: true,
      data: org
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
