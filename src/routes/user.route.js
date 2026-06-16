import { Router } from "express";
import {
  addUser,
  deleteUsers,
  editUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
} from "../controller/user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/greet", (req, res) => {
  console.log("Good Morning Sir!");
  res.send("Good Morning Sir!");
  // 4 to 5 lines code
});
userRouter.post("/", addUser); // http://127.0.0.1:5000/user/
userRouter.use(authMiddleware);

userRouter.get("/", getAllUsers); // http://127.0.0.1:5000/user/
userRouter.get("/:id", getUserById); // http://127.0.0.1:5000/user/
userRouter.get("/email/:email", getUserByEmail); // http://127.0.0.1:5000/user/
userRouter.put("/:id", editUser); // http://127.0.0.1:5000/user/
userRouter.delete("/:id", deleteUsers); // http://127.0.0.1:5000/user/

export default userRouter;
