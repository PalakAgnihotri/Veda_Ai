import { Worker } from "bullmq";
import dotenv from "dotenv";
import { io } from "../index";
import Assignment from "../models/assignment.model";
import { generateQuestions } from "../services/ai.service";

dotenv.config();

new Worker(
  "assignmentQueue",
  async (job) => {
    const { assignmentId, data } = job.data;

    console.log("Processing job:", assignmentId);

    try {
      
      const result = {
  title: data.title,
  subject: "Science",
  class: "5",
  sections: [
    {
      title: "Section A",
      instruction: "Attempt all questions",
      questions: [
        {
          text: "What is electricity?",
          difficulty: "easy",
          marks: 2
        },
        {
          text: "Explain current.",
          difficulty: "medium",
          marks: 3
        }
      ]
    }
  ]
};

      await Assignment.findByIdAndUpdate(assignmentId, {
        result,
        status: "generated"
      });
      io.emit("paper-generated", {
  assignmentId,
  result
});


      console.log("Job completed:", assignmentId);

    } catch (error: any) {
      console.error("Worker error:", error.message);

      await Assignment.findByIdAndUpdate(assignmentId, {
        status: "failed"
      });
    }
  },
  {
    connection: {
      url: process.env.REDIS_URL
    }
  }
);