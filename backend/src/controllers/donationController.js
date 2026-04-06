const Donation = require("../models/Donation")

// CREATE DONATION
exports.createDonation = async (req, res) => {
  try {
    const { title, description, category, condition, imageUrl } = req.body

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      })
    }

    const donation = new Donation({
      title,
      description,
      category,
      condition,
      imageUrl,
      donorId: req.user.id
    })

    await donation.save()

    res.status(201).json({
      message: "Donation item created",
      donation
    })

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    })
  }
}


// GET ALL DONATIONS
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donorId", "name email")

    res.json(donations)

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    })
  }
}


// GET SINGLE DONATION
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("donorId", "name email")

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found"
      })
    }

    res.json(donation)

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    })
  }
}


// UPDATE DONATION
exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found"
      })
    }

    // Only owner can update
    if (donation.donorId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      })
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json({
      message: "Donation updated successfully",
      donation: updatedDonation
    })

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    })
  }
}


// DELETE DONATION
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found"
      })
    }

    // Only owner can delete
    if (donation.donorId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      })
    }

    await Donation.findByIdAndDelete(req.params.id)

    res.json({
      message: "Donation deleted successfully"
    })

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    })
  }
}


// GET MY DONATIONS
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donorId: req.user.id
    })

    res.json(donations)

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    })
  }
}