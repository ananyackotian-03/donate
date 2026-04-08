const Donation = require("../models/Donation")

// CREATE DONATION
exports.createDonation = async (req, res) => {
  try {
    const { title, category, quantity, location, description } = req.body

    // Validation
    if (!title || !category || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and location are required"
      })
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required"
      })
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const donation = new Donation({
      title,
      category,
      quantity,
      location,
      description: description || "",
      imageUrl,
      donorId: req.user.id
    })

    await donation.save()
    await donation.populate("donorId", "name email")

    res.status(201).json({
      success: true,
      message: "Donation item created successfully",
      donation
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    })
  }
}


// GET ALL DONATIONS (with filtering)
exports.getDonations = async (req, res) => {
  try {
    const { category, status } = req.query
    let query = {}

    if (category) query.category = category
    if (status) query.status = status

    const donations = await Donation.find(query)
      .populate("donorId", "name email")
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: donations.length,
      donations
    })

  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
        message: "Donation not found"
      })
    }

    res.json({
      success: true,
      donation
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    })
  }
}


// GET MY DONATIONS (for logged-in user)
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user.id })
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: donations.length,
      donations
    })

  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
        message: "Donation not found"
      })
    }

    // Only owner can update
    if (donation.donorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this donation"
      })
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    ).populate("donorId", "name email")

    res.json({
      success: true,
      message: "Donation updated successfully",
      donation: updatedDonation
    })

  } catch (error) {
    res.status(500).json({
      success: false,
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
        success: false,
        message: "Donation not found"
      })
    }

    // Only owner can delete
    if (donation.donorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this donation"
      })
    }

    await Donation.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: "Donation deleted successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    })
  }
}