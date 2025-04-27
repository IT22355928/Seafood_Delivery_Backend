const Delivery = require("../models/Delivery");
const mongoose = require("mongoose");

// @desc Get all deliveries
// @route GET /api/deliveries
const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().sort({ d_date: -1 });
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Get a delivery by ID
// @route GET /api/deliveries/:id
const getDeliveryById = async (req, res) => {
  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid delivery ID format" });
    }

    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.status(200).json(delivery);
  } catch (error) {
    console.error("Error fetching delivery:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Create a new delivery
// @route POST /api/deliveries
const createDelivery = async (req, res) => {
  try {
    const {
      o_no,
      c_code,
      c_name,
      d_code,
      d_name,
      d_contactno,
      v_no,
      d_date,
      d_location,
      status,
    } = req.body;

    // Validate order number
    if (!o_no || o_no.trim() === "") {
      return res.status(400).json({
        message: "Order number is required",
      });
    }

    // Validate phone number format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(d_contactno)) {
      return res.status(400).json({
        message: "Driver contact must be a 10-digit number",
      });
    }

    // Check if order number already exists
    const existingDelivery = await Delivery.findOne({ o_no });
    if (existingDelivery) {
      return res.status(400).json({
        message: "Delivery with this order number already exists",
      });
    }

    const newDelivery = new Delivery({
      o_no,
      c_code,
      c_name,
      d_code,
      d_name,
      d_contactno,
      v_no,
      d_date: d_date || new Date(),
      d_location,
      status: status || "pending",
    });

    await newDelivery.save();
    res
      .status(201)
      .json({ message: "Delivery created successfully", delivery: newDelivery });
  } catch (error) {
    console.error("Error creating delivery:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc Update delivery details
// @route PUT /api/deliveries/:id
const updateDelivery = async (req, res) => {
  try {
    const { o_no, d_contactno, ...updateData } = req.body;

    // Find existing delivery
    const existingDelivery = await Delivery.findById(req.params.id);
    if (!existingDelivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // Check if order number is being updated and if it already exists
    if (o_no && o_no !== existingDelivery.o_no) {
      if (!o_no || o_no.trim() === "") {
        return res.status(400).json({
          message: "Order number is required",
        });
      }

      const existingWithOrderNo = await Delivery.findOne({ o_no });
      if (existingWithOrderNo) {
        return res.status(400).json({
          message: "Delivery with this order number already exists",
        });
      }
      updateData.o_no = o_no;
    }

    // Check if contact number is being updated and validate it
    if (d_contactno && d_contactno !== existingDelivery.d_contactno) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(d_contactno)) {
        return res.status(400).json({
          message: "Driver contact must be a 10-digit number",
        });
      }
      updateData.d_contactno = d_contactno;
    }

    // Update delivery
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      message: "Delivery updated successfully",
      delivery: updatedDelivery,
    });
  } catch (error) {
    console.error("Error updating delivery:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc Delete a delivery
// @route DELETE /api/deliveries/:id
const deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findOneAndDelete({ _id: req.params.id });
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.status(200).json({ message: "Delivery deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  deleteDelivery,
};