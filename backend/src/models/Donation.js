const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema({

 title: {
  type: String,
  required: true
 },

 description: {
  type: String,
  required: true
 },

 category: {
  type: String
 },

 condition: {
  type: String
 },

 imageUrl: {
  type: String
 },

 status: {
  type: String,
  enum: ["AVAILABLE", "REQUESTED", "CONFIRMED", "DONATED"],
  default: "AVAILABLE"
 },

 donorId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 },

 createdAt: {
  type: Date,
  default: Date.now
 }

})

module.exports = mongoose.model("Donation", donationSchema)