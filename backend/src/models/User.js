const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    role: {
      type: String,
      enum: ['donor', 'org_admin', 'admin'],
      default: 'donor'
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization'
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: String,

    resetToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);