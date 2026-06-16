import dotenv from "dotenv";
dotenv.config({ quiet: true });
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;
import express from "express";
import userRouter from "./routes/user.route.js";
import connectDb from "./util/mongoose.util.js";
import authRouter from "./routes/auth.route.js";
import fileRouter from "./routes/file.route.js";

const server = express();
server.use(express.static("public"));
server.use("/uploads", express.static("uploads"));
server.use("/pdfjs", express.static(path.join(__dirname, "public/pdfjs")));

server.use(express.json());
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

server.get("/", (req, res) => {
  res.send("Server is Up And Running!");
});

server.use("/user", userRouter);
server.use("/auth", authRouter);
server.use("/files", fileRouter);

server.listen(PORT, HOST, async () => {
  console.log(`listening on http://${HOST}:${PORT}/`);
  await connectDb();
});
