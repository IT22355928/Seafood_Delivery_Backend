const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  o_no: {
    type: String,
    required: [true, "Order number is required"],
    unique: true
  },
  c_code: {
    type: String,
    required: [true, "Customer code is required"]
  },
  c_name: {
    type: String,
    required: [true, "Customer name is required"]
  },
  d_code: {
    type: String,
    required: [true, "Driver code is required"]
  },
  d_name: {
    type: String,
    required: [true, "Driver name is required"]
  },
  d_contactno: {
    type: String,
    required: [true, "Driver contact number is required"],
  },
  v_no: {
    type: String,
    required: [true, "Vehicle number is required"]
  },
  d_date: {
    type: Date,
    required: [true, "Delivery date is required"]
  },
  d_location: {
    type: String,
    required: [true, "Delivery location is required"],
    enum: [
      "Matara", "Galle", "Anuradhapura", "Kandy", 
      "Jaffna", "Colombo", "Hambantota", "Monaragala",
      "Trincomalee", "Polonnaruwa", "Moratuwa", "Ratnapura"
    ]
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
}, { 
  timestamps: true,
 
});


module.exports = mongoose.model("Delivery", deliverySchema);