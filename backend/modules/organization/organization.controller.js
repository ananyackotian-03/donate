const Organization = require('./organization.model');
const User = require('../../src/models/User');
const { createNotification } = require('../../utils/notificationService');

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

// GET ALL ORGANIZATIONS (ADMIN ONLY)
exports.getAllOrganizationsAdmin = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const orgs = await Organization.find()
      .populate('adminUser', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orgs
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// VERIFY / REJECT ORGANIZATION (ADMIN ONLY)
exports.verifyOrganization = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const { action, rejectionReason } = req.body;

    const org = await Organization.findById(req.params.id);

    if (!org) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }

    if (action === 'approve') {
      org.verificationStatus = 'verified';
      org.verifiedBy = req.user._id;
      org.verifiedAt = new Date();
    }

    else if (action === 'reject') {
      if (!rejectionReason) {
        return res.status(400).json({
          success: false,
          message: 'Rejection reason is required'
        });
      }

      org.verificationStatus = 'rejected';
      org.rejectionReason = rejectionReason;
    }

    else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action'
      });
    }

    await org.save();

    // Send notification to org admin
    if (action === 'approve') {
      await createNotification({
        recipient: org.adminUser,
        type: 'org_verified',
        title: 'Organization Verified',
        message: `Your organization "${org.name}" has been approved!`,
        relatedOrg: org._id,
      });
    } else if (action === 'reject') {
      await createNotification({
        recipient: org.adminUser,
        type: 'org_rejected',
        title: 'Organization Rejected',
        message: `Your organization was rejected. Reason: ${rejectionReason}`,
        relatedOrg: org._id,
      });
    }

    res.status(200).json({
      success: true,
      message: `Organization ${action}d successfully`,
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

// ADD MEMBER TO ORGANIZATION
exports.addMember = async (req, res) => {
  try {
    const { email } = req.body;

    const org = await Organization.findById(req.params.id);

    if (!org) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }

    // Check if requester is org admin
    if (org.adminUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only org admin can add members'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (org.members.includes(user._id)) {
      return res.status(400).json({
        success: false,
        message: 'User already a member'
      });
    }

    org.members.push(user._id);
    await org.save();

    user.organization = org._id;
    await user.save();

    // Send notification to new member
    await createNotification({
      recipient: user._id,
      type: 'new_member',
      title: 'Added to Organization',
      message: `You have been added to ${org.name}`,
      relatedOrg: org._id,
    });

    res.status(200).json({
      success: true,
      message: 'Member added successfully',
      data: org.members
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// REMOVE MEMBER FROM ORGANIZATION
exports.removeMember = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id);

    if (!org) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }

    // Check if requester is org admin
    if (org.adminUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only org admin can remove members'
      });
    }

    const userId = req.params.userId;

    org.members = org.members.filter(
      member => member.toString() !== userId
    );

    await org.save();

    await User.findByIdAndUpdate(userId, {
      organization: null
    });

    res.status(200).json({
      success: true,
      message: 'Member removed successfully',
      data: org.members
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// GET ORGANIZATION MEMBERS
exports.getMembers = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id)
      .populate('members', 'name email');

    if (!org) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }

    res.status(200).json({
      success: true,
      data: org.members
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
