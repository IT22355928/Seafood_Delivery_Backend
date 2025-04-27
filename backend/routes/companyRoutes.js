const express = require("express");
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companycontroller");

const router = express.Router();

// Routes
router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/", createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

module.exports = router;