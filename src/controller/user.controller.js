import bcrypt from "bcryptjs";
import userModel from "../model/user.model.js";

async function getAllUsers(req, res) {
  try {
    const users = await userModel.find();
    res.json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function addUser(req, res) {
  const body = req.body;
  try {
    body.password = bcrypt.hashSync(body.password, 10);
    console.log(body);
    const user = await userModel.create(body);
    
    res
      .status(201)
      .json({ success: true, message: "User added successfully", data: user });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "unable to add user!",
        success: false,
        error: err.message,
      });
  }
}
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function editUser(req, res) {
  const body = req.body;
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndUpdate(id, body, { new: true });
    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}

async function deleteUsers(req, res) {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  addUser,
  deleteUsers,
  editUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
};
