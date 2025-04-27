const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  c_regno: {
    type: String,
    required: [true, "Company registration number is required"],
  },
  c_name: {
    type: String,
    required: [true, "Company name is required"]
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },

  o_name: {
    type: String,
    required: [true, "Owner name is required"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);