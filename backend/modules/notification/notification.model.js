const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "donation_requested",
        "request_confirmed",
        "request_rejected",
        "donation_delivered",
        "org_verified",
        "org_rejected",
        "new_member",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedDonation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },
    relatedOrg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
