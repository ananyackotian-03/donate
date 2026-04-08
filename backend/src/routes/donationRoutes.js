const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../../config/multerConfig")

const {
  createDonation,
  getDonations,
  getDonationById,
  getMyDonations,
  updateDonation,
  deleteDonation
} = require("../controllers/donationController")

// Public routes
router.get("/", getDonations)
router.get("/:id", getDonationById)

// Protected routes (require authentication)
router.post("/", authMiddleware, upload.single('image'), createDonation)
router.get("/my-donations", authMiddleware, getMyDonations)
router.put("/:id", authMiddleware, updateDonation)
router.delete("/:id", authMiddleware, deleteDonation)

module.exports = router