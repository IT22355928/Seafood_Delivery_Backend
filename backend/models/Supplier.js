const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    s_regno: {
      type: String,
      required: [true, "Supplier registration number is required"],
      unique: true,
    },
    s_name: {
      type: String,
      required: [true, "Supplier name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    maritalstatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
      default: "single",
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
    },
    gender: {
      type: String,
      required: [true, "Supplier gender is required"],
      enum: ["male", "female", "other"],
      default: "male",
    },
    birthday: {
      type: Date,
      required: [true, "Supplier birthday is required"],
    },
    profile: {
      type: String,
      required: [true, "Supplier profile image is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        // Remove version key when converting to JSON
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Supplier", supplierSchema);
