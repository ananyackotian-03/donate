const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema({

 title: {
  type: String,
  required: true
 },

 category: {
  type: String,
  required: true
 },

 quantity: {
  type: Number,
  required: true,
  default: 1
 },

 location: {
  type: String,
  required: true
 },

 description: {
  type: String
 },

 imageUrl: {
  type: String,
  default: null
 },

 status: {
  type: String,
  enum: ["AVAILABLE", "REQUESTED", "CONFIRMED", "DONATED"],
  default: "AVAILABLE"
 },

 donorId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
 },

 createdAt: {
  type: Date,
  default: Date.now
 },

 updatedAt: {
  type: Date,
  default: Date.now
 }

})

module.exports = mongoose.model("Donation", donationSchema)