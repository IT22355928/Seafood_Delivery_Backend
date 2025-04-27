const express = require("express");
const { validateStock } = require("../validations/stock-validations");
const {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock
} = require("../controllers/stockcontroller");

const router = express.Router();

// Inventory Routes
router.get("/", getAllStocks);          // GET all inventory items
router.get("/:id", getStockById);     // GET single inventory item by ID
router.post("/", validateStock, createStock); // CREATE with validation
router.put("/:id", validateStock, updateStock); // UPDATE with validation
router.delete("/:id", deleteStock);   // DELETE inventory item

module.exports = router;