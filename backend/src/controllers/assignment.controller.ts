import { Request, Response } from "express";
import Assignment from "../models/assignment.model";
import { assignmentQueue } from "../queue/queue";

export const createAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.create(req.body);

    await assignmentQueue.add("generate-paper", {
      assignmentId: assignment._id,
      data: req.body
    });

    return res.json({
      message: "Assignment created & processing started",
      assignment
    });

  } catch (err: any) {   
    return res.status(500).json({
      error: err.message || "Something went wrong"
    });
  }
};
export const getAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(assignment);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};