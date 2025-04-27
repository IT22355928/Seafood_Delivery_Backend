const { body } = require("express-validator");

const validateCompany = [
  body("c_name").notEmpty().withMessage("Company name is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("o_name").notEmpty().withMessage("Owner name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("description").optional(),
  body("status").isIn(["active", "inactive"]).withMessage("Invalid status"),
];

module.exports = { validateCompany };
