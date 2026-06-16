import fs from "fs";
import path from "path";
import File from "../model/file.model.js";

const uploadDir = path.resolve("uploads");

const getAllFiles = async (req, res) => {
  try {
    if (!fs.existsSync(uploadDir)) {
      return res.json({
        success: true,
        message: "No files found",
        data: [],
      });
    }

    const files = await fs.promises.readdir(uploadDir);
    const data = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(uploadDir, filename);
        const stats = await fs.promises.stat(filePath);
        return {
          id: filename,
          name: filename,
          size: stats.size,
          createdAt: stats.birthtime,
          url: `/uploads/${filename}`,
        };
      }),
    );
    console.log(data);
    
    res.json({
      success: true,
      message: "Files retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getFileById = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findById(id);

    if (!file) {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    const filePath = path.resolve(`.${file.url}`);

    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ success: false, message: "File not found on server" });
    }

    res.download(filePath, file.name, (err) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Use the field name 'doc'.",
      });
    }

    const uploadPromises = req.files.map((file) => {
      return File.create({
        name: file.originalname,
        size: file.size,
        createdAt: new Date(),
        url: `/uploads/${file.filename}`,
      });
    });

    const files = await Promise.all(uploadPromises);

    if (!files || files.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to save file metadata",
      });
    }

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        files: files.map((file) => ({
          id: file._id,
          name: file.name,
          size: file.size,
          createdAt: file.createdAt,
          url: file.url,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getAllFiles, getFileById, uploadFile };
