import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import assignmentRoutes from "./routes/assignment.routes";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/api/assignments", assignmentRoutes);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

server.listen(5001, () => {
  console.log("Server running on port 5001");
});