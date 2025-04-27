const Vehicle = require("../models/vehicle");

// @desc Get all vehicles
// @route GET /api/vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Get a vehicle by ID
// @route GET /api/vehicles/:id
const getVehicleById = async (req, res) => {
  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid vehicle ID format" });
    }

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Create a new vehicle
// @route POST /api/vehicles

const createVehicle = async (req, res) => {
  try {
    const {
      licensePlate,
      v_type,
      v_model,
      year,
      refrigeration_type,
      last_maintenance,
      delivery_area,
      max_load,
      fuel_type,
      certification_no,
      certification_expire_date,
      status,
    } = req.body;

    // Validate license plate format (XXX-XXXX)
    const licensePlateRegex = /^[A-Z]{3}-\d{4}$/;
    if (!licensePlateRegex.test(licensePlate.toUpperCase())) {
      return res.status(400).json({
        message:
          "License plate must be in format XXX-XXXX (3 uppercase letters followed by hyphen and 4 digits)",
      });
    }

    // Validate certification number format (CT followed by 3 digits)
    if (certification_no && !/^CT\d{3}$/.test(certification_no)) {
      return res.status(400).json({
        message:
          "Certification number must start with 'CT' followed by 3 digits (e.g., CT123)",
      });
    }

    // Check if license plate already exists
    const existingVehicle = await Vehicle.findOne({
      licensePlate: licensePlate.toUpperCase(),
    });
    if (existingVehicle) {
      return res.status(400).json({
        message: "Vehicle with this license plate already exists",
      });
    }

    // Check if certification number already exists
    if (certification_no) {
      const existingCert = await Vehicle.findOne({ certification_no });
      if (existingCert) {
        return res.status(400).json({
          message: "Certification number already exists",
        });
      }
    }

    // Extract uploaded files
    const v_image = req.files?.v_image ? req.files.v_image[0].buffer : null;
    const v_document = req.files?.v_document
      ? req.files.v_document[0].buffer
      : null;

    const newVehicle = new Vehicle({
      licensePlate: licensePlate.toUpperCase(),
      v_type,
      v_model,
      year,
      refrigeration_type: refrigeration_type || "None",
      last_maintenance: last_maintenance || new Date(),
      delivery_area,
      max_load,
      fuel_type,
      certification_no,
      certification_expire_date,
      v_image,
      v_document,
      status: status || "active",
    });

    await newVehicle.save();
    res
      .status(201)
      .json({ message: "Vehicle created successfully", vehicle: newVehicle });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc Update vehicle details
// @route PUT /api/vehicles/:id
const updateVehicle = async (req, res) => {
  try {
    const { licensePlate, certification_no, ...updateData } = req.body;

    console.log("Received Data:", req.body);
    console.log("Received Files:", req.files);

    // Find existing vehicle
    const existingVehicle = await Vehicle.findById(req.params.id);
    if (!existingVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Check if license plate is being updated and if it already exists
    if (licensePlate && licensePlate !== existingVehicle.licensePlate) {
      const licensePlateRegex = /^[A-Z]{3}-\d{4}$/;
      if (!licensePlateRegex.test(licensePlate.toUpperCase())) {
        return res.status(400).json({
          message:
            "License plate must be in format XXX-XXXX (3 uppercase letters followed by hyphen and 4 digits)",
        });
      }

      const existingWithLicense = await Vehicle.findOne({
        licensePlate: licensePlate.toUpperCase(),
      });
      if (existingWithLicense) {
        return res.status(400).json({
          message: "Vehicle with this license plate already exists",
        });
      }
      updateData.licensePlate = licensePlate.toUpperCase();
    }

    // Check if certification number is being updated and if it already exists
    if (
      certification_no &&
      certification_no !== existingVehicle.certification_no
    ) {
      if (!/^CT\d{3}$/.test(certification_no)) {
        return res.status(400).json({
          message:
            "Certification number must start with 'CT' followed by 3 digits (e.g., CT123)",
        });
      }

      const existingWithCert = await Vehicle.findOne({ certification_no });
      if (existingWithCert) {
        return res.status(400).json({
          message: "Certification number already exists",
        });
      }
      updateData.certification_no = certification_no;
    }

    // Handle file uploads (if provided)
    if (req.files?.v_image) {
      updateData.v_image = req.files.v_image[0].buffer;
    }
    if (req.files?.v_document) {
      updateData.v_document = req.files.v_document[0].buffer;
    }

    // Update vehicle
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc Delete a vehicle
// @route DELETE /api/vehicles/:id
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
