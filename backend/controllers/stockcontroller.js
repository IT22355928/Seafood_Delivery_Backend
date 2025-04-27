const Stock = require("../models/Stock");

// @desc Get all stock items
// @route GET /api/stocks
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Get a stock item by ID
// @route GET /api/stocks/:id
const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findOne({ _id: req.params.id });
    if (!stock) return res.status(404).json({ message: "Stock item not found" });
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Create a new stock item
// @route POST /api/stocks
const createStock = async (req, res) => {
  try {
    const { 
      i_code, 
      i_name, 
      i_category, 
      i_description, 
      qty, 
      u_price, 
      t_value, 
      s_name, 
      d_purchase, 
      s_contact, 
      location, 
      status,
      image
    } = req.body;

    // Check if item code is already used
    const existingStock = await Stock.findOne({ i_code });
    if (existingStock) return res.status(400).json({ message: "Item code already exists" });

    // Calculate total value if not provided
    const totalValue = t_value || (parseFloat(qty) * parseFloat(u_price)).toFixed(2);

    const newStock = new Stock({
      i_code,
      i_name,
      i_category,
      i_description,
      qty: parseFloat(qty),
      u_price: parseFloat(u_price),
      t_value: parseFloat(totalValue),
      s_name,
      d_purchase,
      s_contact,
      location,
      status,
      image
    });
    
    await newStock.save();
    res.status(201).json(newStock);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Update stock item details
// @route PUT /api/stocks/:id
const updateStock = async (req, res) => {
  try {
    const existingStock = await Stock.findOne({ _id: req.params.id });
    if (!existingStock) return res.status(404).json({ message: "Stock item not found" });

    // Check if item code is being changed to one that already exists
    if (req.body.i_code && req.body.i_code !== existingStock.i_code) {
      const stockWithSameCode = await Stock.findOne({ i_code: req.body.i_code });
      if (stockWithSameCode) return res.status(400).json({ message: "Item code already exists" });
    }

    // Calculate total value if quantity or unit price is being updated
    if (req.body.qty || req.body.u_price) {
      const quantity = req.body.qty || existingStock.qty;
      const unitPrice = req.body.u_price || existingStock.u_price;
      req.body.t_value = (parseFloat(quantity) * parseFloat(unitPrice)).toFixed(2);
    }

    const updatedStock = await Stock.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Delete a stock item
// @route DELETE /api/stocks/:id
const deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findOneAndDelete({ _id: req.params.id });
    if (!stock) return res.status(404).json({ message: "Stock item not found" });
    res.status(200).json({ message: "Stock item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock
};