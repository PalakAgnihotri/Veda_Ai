import { Queue } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

export const assignmentQueue = new Queue("assignmentQueue", {
  connection: {
    url: process.env.REDIS_URL
  }
});