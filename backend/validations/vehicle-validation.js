const { body } = require("express-validator");

const validateVehicle = [
  body("licensePlate")
    .notEmpty().withMessage("License plate is required")
    .isLength({ min: 5 }).withMessage("License plate must be at least 5 characters")
    .trim()
    .toUpperCase(),
    
  body("v_type")
    .notEmpty().withMessage("Vehicle type is required")
    .isIn(["Truck", "Van", "Pickup", "Trailer", "Refrigerated Truck"]).withMessage("Invalid vehicle type"),
    
  body("v_model")
    .notEmpty().withMessage("Vehicle model is required")
    .isIn(["Isuzu NPR", "Ford Transit", "Mercedes Sprinter", "Volvo FH", "Hino 300"]).withMessage("Invalid vehicle model"),
    
  body("year")
    .notEmpty().withMessage("Year is required")
    .isInt({ min: 1990, max: new Date().getFullYear() }).withMessage(`Year must be between 1990 and ${new Date().getFullYear()}`),
    
  body("refrigeration_type")
    .optional()
    .isIn(["None", "Basic", "Medium", "Heavy", "Ultra-low"]).withMessage("Invalid refrigeration type"),
    
  body("last_maintenance")
    .optional()
    .isISO8601().withMessage("Invalid date format"),
    
  body("delivery_area")
    .notEmpty().withMessage("Delivery area is required"),
    
  body("max_load")
    .notEmpty().withMessage("Max load is required")
    .isFloat({ gt: 0 }).withMessage("Max load must be greater than 0"),
    
  body("fuel_type")
    .notEmpty().withMessage("Fuel type is required")
    .isIn(["Diesel", "Petrol", "Electric", "Hybrid", "CNG"]).withMessage("Invalid fuel type"),
    
  body("certification_no")
    .notEmpty().withMessage("Certification number is required"),
    
  body("certification_expire_date")
    .notEmpty().withMessage("Certification expiry date is required")
    .isISO8601().withMessage("Invalid date format"),
    
  body("v_image")
    .notEmpty().withMessage("Vehicle image is required"),
    
  body("v_document")
    .notEmpty().withMessage("Vehicle document is required"),
    
  body("status")
    .optional()
    .isIn(["active", "inactive", "maintenance", "out_of_service"]).withMessage("Invalid status")
];

module.exports = { validateVehicle };