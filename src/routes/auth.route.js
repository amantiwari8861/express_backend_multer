import bcrypt from "bcryptjs";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

import { Router } from "express";
const authRouter = Router();
authRouter.post("/login", login);
export default authRouter;

async function login(req, res) {
  const { email, password } = req.body;
//   console.log(email, password);

  try {
    const userInDB = await userModel.findOne({ email });
    // console.log(userInDB);
    
    if (!userInDB) {
      return res.status(400).send("account doesn't exist!");
    }

    if (!bcrypt.compareSync(password, userInDB.password)) {
      return res.status(400).send("invalid credentials!");
    }

    const token = generateToken(userInDB);

    return res.send({ message: "login succesfully!", status: true, token });
  } catch (error) {
    console.log(error);
  }
}
function generateToken(userData) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not Set");
  }
  return jwt.sign({ email: userData.email, role: userData.role }, JWT_SECRET, {
    expiresIn: "1hr",
  });
}
