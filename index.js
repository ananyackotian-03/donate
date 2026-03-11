require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

const authRoutes = require("./src/routes/authRoutes")

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
 res.send("DaanSetu Backend Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})