const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    enum: ['ngo', 'trust', 'community', 'government', 'other'],
    required: true
  },

  registrationNo: {
    type: String
  },

  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },

  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  verifiedAt: Date,

  rejectionReason: String,

  logo: String,

  documents: [String],

  address: {
    type: String,
    required: true
  },

  contactEmail: {
    type: String,
    required: true
  },

  contactPhone: String,

  website: String,

  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: [Number]
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);
