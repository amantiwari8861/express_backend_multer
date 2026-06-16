import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  createdAt: Date,
  url: String,
});
const File = mongoose.model("File", fileSchema);
export default File;