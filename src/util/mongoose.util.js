import mongoose from "mongoose";

async function connectDb() {
  const con = await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to :", con.connections[0].host);
}
export default connectDb;
