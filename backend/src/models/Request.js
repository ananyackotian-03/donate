const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({

 donationId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Donation"
 },

 organizationId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 },

 status: {
  type: String,
  enum: ["PENDING", "APPROVED", "REJECTED"],
  default: "PENDING"
 },

 createdAt: {
  type: Date,
  default: Date.now
 }

})

module.exports = mongoose.model("Request", requestSchema)