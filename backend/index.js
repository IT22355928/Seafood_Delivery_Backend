require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const companyRoutes = require("./routes/companyRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const stockRoutes = require("./routes/stockRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/suppliers", supplierRoutes);  
app.use("/api/stocks", stockRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/feedbacks", feedbackRoutes);

// MongoDB Connection (modern version - no deprecated options)
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Initialize connection
connectDB();