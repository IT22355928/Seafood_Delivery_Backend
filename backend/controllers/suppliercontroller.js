const Supplier = require("../models/Supplier");

// @desc Get all suppliers
// @route GET /api/suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Get a supplier by ID
// @route GET /api/suppliers/:id
const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ _id: req.params.id });
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Create a new supplier
// @route POST /api/suppliers
const createSupplier = async (req, res) => {
  try {
    const { 
      s_regno, 
      s_name, 
      address, 
      maritalstatus, 
      email, 
      phone, 
      gender, 
      birthday, 
      profile,
      status
    } = req.body;

    // Validate registration number format (S followed by 4 digits)
    const regNoRegex = /^S\d{4}$/;
    if (!regNoRegex.test(s_regno)) {
      return res.status(400).json({ 
        message: "Registration number must start with 'S' followed by exactly 4 digits (e.g., S1234)" 
      });
    }

    // Validate required fields
    if (!s_name) return res.status(400).json({ message: "Supplier name is required" });
    if (!address) return res.status(400).json({ message: "Address is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Please enter a valid email address (e.g., example@domain.com)" 
      });
    }

    // Validate phone number (10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return res.status(400).json({ 
        message: "Please enter a valid 10-digit phone number" 
      });
    }

    // Check if email is already used
    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) return res.status(400).json({ message: "Email already exists" });

    const newSupplier = new Supplier({
      s_regno,
      s_name,
      address,
      maritalstatus,
      email,
      phone: phoneDigits, // Store only digits
      gender,
      birthday,
      profile,
      status: status || "active"
    });

    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    console.log("Error creating supplier:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Update supplier details
// @route PUT /api/suppliers/:id
const updateSupplier = async (req, res) => {
  try {
    const existingSupplier = await Supplier.findOne({ _id: req.params.id });
    if (!existingSupplier) return res.status(404).json({ message: "Supplier not found" });

    // Check if email is being changed and validate
    if (req.body.email && req.body.email !== existingSupplier.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ 
          message: "Please enter a valid email address (e.g., example@domain.com)" 
        });
      }

      const emailExists = await Supplier.findOne({ email: req.body.email });
      if (emailExists) return res.status(400).json({ message: "Email already exists" });
    }

    // Validate phone number if being updated
    if (req.body.phone) {
      const phoneDigits = req.body.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        return res.status(400).json({ 
          message: "Please enter a valid 10-digit phone number" 
        });
      }
      req.body.phone = phoneDigits;
    }

    // Validate registration number if being updated
    if (req.body.s_regno) {
      const regNoRegex = /^S\d{4}$/;
      if (!regNoRegex.test(req.body.s_regno)) {
        return res.status(400).json({ 
          message: "Registration number must start with 'S' followed by exactly 4 digits (e.g., S1234)" 
        });
      }
    }

    const supplier = await Supplier.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(supplier);
  } catch (error) {
    console.log("Error updating supplier:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Delete a supplier
// @route DELETE /api/suppliers/:id
const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndDelete({ _id: req.params.id });
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};