import Logo from "../models/logo.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import fs from 'fs';

// Create a new logo
export const createLogo = async (req, res) => {
  let logoLocalPath = null; // Declare outside of try block

  try {
    // Check if the file is present
    if (req.files && req.files.logo && req.files.logo.length > 0) {
      logoLocalPath = req.files.logo[0].path; // Assign logoLocalPath here
    }

    if (!logoLocalPath) {
      return res.status(400).send("Logo file is required");
    }

    const newLogo = await uploadOnCloudinary(logoLocalPath);

    // Create a new logo instance
    const logo = new Logo({
      logo: newLogo.url // Assuming newLogo contains the URL after uploading to Cloudinary
    });

    // Save the logo to the database
    await logo.save();

    // Send the newly created logo back to the client
    res.status(201).send(logo);

  } catch (error) {
    console.error("Error creating logo:", error);
    res.status(500).send("Failed to create logo");
  } finally {
    // Delete the temporary uploaded file if it exists
    if (logoLocalPath && fs.existsSync(logoLocalPath)) {
      fs.unlinkSync(logoLocalPath);
    }
  }
};

// Get all logos
export const getLogos = async (req, res) => {
  try {
    const logos = await Logo.find(); // Fetch all logos from the database
    res.status(200).send(logos);
  } catch (error) {
    console.error("Error fetching logos:", error);
    res.status(500).send("Failed to fetch logos");
  }
};

// Update a logo
// Update a logo
export const updateLogo = async (req, res) => {
  const { id } = req.params; // Extracting the logo ID from the request parameters
  let logoLocalPath = null; // Declare outside of try block

  try {
    // Check if the new file is present
    if (req.files && req.files.logo && req.files.logo.length > 0) {
      logoLocalPath = req.files.logo[0].path;
    }

    let updatedLogo = {};

    // If a new logo file is provided, upload it to Cloudinary
    if (logoLocalPath) {
      const newLogo = await uploadOnCloudinary(logoLocalPath);
      updatedLogo.logo = newLogo.url; // Set the new logo URL, not the entire object
    }

    // Update the logo in the database
    const logo = await Logo.findByIdAndUpdate(id, updatedLogo, { new: true });

    if (!logo) {
      return res.status(404).send("Logo not found");
    }

    res.status(200).send(logo);
  } catch (error) {
    console.error("Error updating logo:", error);
    res.status(500).send("Failed to update logo");
  } finally {
    // Delete the temporary uploaded file if it exists
    if (logoLocalPath && fs.existsSync(logoLocalPath)) {
      fs.unlinkSync(logoLocalPath);
    }
  }
};


// Delete a logo
export const deleteLogo = async (req, res) => {
  const { id } = req.params; // Extracting the logo ID from the request parameters
  try {
    const logo = await Logo.findByIdAndDelete(id);

    if (!logo) {
      return res.status(404).send("Logo not found");
    }

    res.status(200).send("Logo deleted successfully");
  } catch (error) {
    console.error("Error deleting logo:", error);
    res.status(500).send("Failed to delete logo");
  }
};
