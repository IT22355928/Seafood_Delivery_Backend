const { body } = require("express-validator");

const validateSupplier = [
  body("s_regno")
    .notEmpty().withMessage("Supplier registration number is required")
    .matches(/^S\d{4}$/).withMessage("Registration number must start with 'S' followed by 4 digits (e.g., S1234)"),
  
  body("s_name")
    .notEmpty().withMessage("Supplier name is required"),
    
  body("address")
    .notEmpty().withMessage("Address is required"),
    
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address (e.g., example@domain.com)"),
    
  body("phone")
    .notEmpty().withMessage("Phone number is required")
    .isLength({ min: 10, max: 10 }).withMessage("Phone number must be 10 digits")
    .matches(/^\d+$/).withMessage("Phone number must contain only numbers"),
    
  body("maritalstatus")
    .optional()
    .isIn(["single", "married", "divorced", "widowed"]).withMessage("Invalid marital status"),
    
  body("gender")
    .optional()
    .isIn(["male", "female", "other"]).withMessage("Invalid gender"),
    
  body("birthday")
    .optional()
    .isISO8601().withMessage("Invalid date format"),
    
  body("profile")
    .optional(),
    
  body("status")
    .optional()
    .isIn(["active", "inactive"]).withMessage("Invalid status")
];

module.exports = { validateSupplier };