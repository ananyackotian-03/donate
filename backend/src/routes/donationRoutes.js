const express = require("express")
const router = express.Router()

const { register, login } = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")

// register
router.post("/register", register)

// login
router.post("/login", login)

// protected test route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  })
})

module.exports = router