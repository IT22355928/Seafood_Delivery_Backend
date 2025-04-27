const express = require("express");

const {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDelivery,
  deleteDelivery,
} = require("../controllers/deliveryController");

const router = express.Router();

// Delivery Routes
router.get("/", getAllDeliveries);
router.get("/:id", getDeliveryById);
router.post("/", createDelivery);
router.put("/:id", updateDelivery);
router.delete("/:id", deleteDelivery);

module.exports = router;