const { body } = require("express-validator");

const validateStock = [
  body("i_code")
    .notEmpty().withMessage("Item code is required")
    .matches(/^I\d{4}$/).withMessage("Item code must be in format I1234 (I followed by 4 digits)"),
  
  body("i_name")
    .notEmpty().withMessage("Item name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Item name must be between 2-100 characters"),
    
  body("i_category")
    .notEmpty().withMessage("Category is required")
    .isIn(["Electronics", "Furniture", "Office Supplies", "Tools", "Other"])
    .withMessage("Invalid category"),
    
  body("qty")
    .notEmpty().withMessage("Quantity is required")
    .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    
  body("u_price")
    .notEmpty().withMessage("Unit price is required")
    .isFloat({ min: 0.01 }).withMessage("Unit price must be greater than 0"),
    
  body("t_value")
    .optional()
    .isFloat({ min: 0 }).withMessage("Total value cannot be negative"),
    
  body("s_name")
    .optional()
    .isLength({ max: 100 }).withMessage("Supplier name too long"),
    
  body("d_purchase")
    .optional()
    .isISO8601().withMessage("Invalid date format (YYYY-MM-DD)"),
    
  body("s_contact")
    .optional()
    .isMobilePhone().withMessage("Invalid phone number format"),
    
  body("location")
    .optional()
    .isLength({ max: 100 }).withMessage("Location too long"),
    
  body("i_description")
    .optional()
    .isLength({ max: 500 }).withMessage("Description too long"),
    
  body("status")
    .optional()
    .isIn(["active", "inactive"]).withMessage("Invalid status")
];

module.exports = { validateStock };