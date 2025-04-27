// const { validationResult } = require("express-validator");
const Company = require("../models/Company");

// @desc Get all companies
// @route GET /api/companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Get a company by ID
// @route GET /api/companies/:id
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id });
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Create a new company
// @route POST /api/companies
const createCompany = async (req, res) => {
  try {
    const { c_regno, c_name, address, o_name, email, phone, description, status } = req.body;

    // Check if email is already used
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) return res.status(400).json({ message: "Email already exists" });

    const newCompany = new Company({
      c_regno,
      c_name,
      address,
      o_name,
      email,
      phone,
      description,
      status,
    });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    console.log( "error", error)

    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Update company details
// @route PUT /api/companies/:id
const updateCompany = async (req, res) => {

  try {
    const existingCompany = await Company.findOne({ _id: req.params.id });

    if (req.body.email !== existingCompany.email) {
      const existingCompany = await Company.findOne({ email: req.body.email });
      if (existingCompany) return res.status(400).json({ message: "Email already exists" });
    }

    const company = await Company.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {

    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Delete a company
// @route DELETE /api/companies/:id
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({ _id: req.params.id });
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};