const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path')

dotenv.config();

const app = express();



app.use(cors({ origin: "https://edu-gen-frontend.vercel.app/", credentials: true })); // ✅ Allow frontend requests


// ✅ Parse JSON requests
app.use(express.json());

// ✅ Connect to the database
connectDB();

// ✅ Serve uploaded files statically
// app.use("/uploads", express.static("uploads"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/", uploadRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
