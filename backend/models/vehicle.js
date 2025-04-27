const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  v_type: { type: String, required: true },
  v_model: { type: String, required: true },
  year: { type: Number, required: true },
  refrigeration_type: { type: String, default: "None" },
  last_maintenance: { type: Date, default: Date.now },
  delivery_area: { type: String, required: true },
  max_load: { type: Number, required: true },
  fuel_type: { type: String, required: true },
  certification_no: { type: String, unique: true, sparse: true },
  certification_expire_date: { type: Date },
  v_image: { type: String },
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
