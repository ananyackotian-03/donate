const Donation = require("../../models/Donation")

// CREATE DONATION ITEM
exports.createDonation = async (req, res) => {

 try {

  const { title, description, category, condition, imageUrl } = req.body

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
   error
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
   error
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
   error
  })

 }

}