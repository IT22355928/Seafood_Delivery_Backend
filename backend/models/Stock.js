const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    i_code: {
      type: String,
      required: [true, "Item code is required"],
      unique: true,
    },
    i_name: {
      type: String,
      required: [true, "Item name is required"],
    },
    i_category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "White Fish",
        "Oily Fish",
        "Exotic/Game Fish",
        "Shrimp/Prawns",
        "Crabs",
        "Lobsters",
        "Bivalves",
        "Gastropods",
        "Cephalopods",
        "Other"
      ],
      default: "Other",
    },
    i_description: {
      type: String,
      required: false,
    },
    qty: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    u_price: {
      type: Number,
      required: [true, "Unit price is required"],
      min: [0.01, "Unit price must be greater than 0"],
    },
    t_value: {
      type: Number,
      required: [true, "Total value is required"],
      min: [0, "Total value cannot be negative"],
    },
    s_name: {
      type: String,
      required: false,
    },
    d_purchase: {
      type: Date,
      required: false,
    },
    s_contact: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Calculate total value before saving
stockSchema.pre("save", function (next) {
  if (this.isModified("qty") || this.isModified("u_price")) {
    this.t_value = (this.qty * this.u_price).toFixed(2);
  }
  next();
});

module.exports = mongoose.model("Stock", stockSchema);
