const express = require("express")
const router = express.Router()

const { createDonation, getDonations, getDonationById } = require("../controllers/donationController")
const authMiddleware = require("../middleware/authMiddleware")

// create donation item
router.post("/create", authMiddleware, createDonation)

// get all donation items
router.get("/", getDonations)

// get single donation item
router.get("/:id", getDonationById)

module.exports = router