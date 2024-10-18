import Certificate from '../models/Certificate.js';
import uploadOnCloudinary from '../utils/cloudinary.js'; // Adjust the path as needed
import path from 'path';

export const createCertificate = async (req, res) => {
  try {
    let imageLocalPath = null;

    // Check if the file is present
    if (req.files && req.files.image && req.files.image.length > 0) {
      imageLocalPath = req.files.image[0].path;
    }

    if (!imageLocalPath) {
      return res.status(400).send("Image file is required");
    }

 

    // Upload the image to Cloudinary
    const imageUploadResult = await uploadOnCloudinary(imageLocalPath);

    if (!imageUploadResult) {
      return res.status(500).send("Failed to upload image to Cloudinary");
    }

    console.log("Cloudinary image URL:", imageUploadResult.secure_url);

    // Create a new certificate
    const newCertificate = new Certificate({
      name: req.body.name,
      description: req.body.description,
      session: {
        start: req.body.startDate,
        end: req.body.endDate,
      },
      organization: req.body.organization,
      issuedDate: req.body.issuedDate,
      image: imageUploadResult.secure_url, // Use secure_url for the image URL
    });

    // Save the certificate
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error) {
    console.error("Error creating certificate:", error);
    res.status(500).json({ error: 'Failed to create certificate' });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByIdAndDelete(id);
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });

    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    let imageUrl = req.body.image; // Preserve existing image URL if not updating

    if (req.file) {
      const filePath = path.join(__dirname, '../public/temp', req.file.filename);
      const result = await uploadOnCloudinary(filePath);
      imageUrl = result ? result.secure_url : imageUrl;
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      id,
      { ...req.body, image: imageUrl },
      { new: true }
    );

    if (!updatedCertificate) return res.status(404).json({ error: 'Certificate not found' });

    res.status(200).json(updatedCertificate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update certificate' });
  }
};

export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });

    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get certificate' });
  }
};



export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
};
