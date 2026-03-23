import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  dueDate: Date,
  instructions: String,
  questions: [
    {
      type: {
        type: String
      },
      count: Number,
      marks: Number
    }
  ],
  status: {
    type: String,
    default: "pending"
  },
  result: Object
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);