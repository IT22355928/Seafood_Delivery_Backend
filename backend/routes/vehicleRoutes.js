const express = require("express");

const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehiclecontroller");

const router = express.Router();

// Vehicle Routes
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

module.exports=router;