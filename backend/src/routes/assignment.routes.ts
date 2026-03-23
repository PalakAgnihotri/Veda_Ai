import express from "express";
import { createAssignment } from "../controllers/assignment.controller";
import { getAssignment } from "../controllers/assignment.controller";
const router = express.Router();

router.post("/", createAssignment);
router.get("/:id", getAssignment);
export default router;