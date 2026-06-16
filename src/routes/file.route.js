import {Router} from "express"
import { getAllFiles, getFileById, uploadFile } from "../controller/file.controller.js";
import upload from "../../config/multer.config.js";
const fileRouter = Router();

fileRouter.get("/",getAllFiles);
fileRouter.get("/:id",getFileById);
fileRouter.post("/", upload.array("doc"),uploadFile);
export default fileRouter;