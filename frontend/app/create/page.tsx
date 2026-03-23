"use client";

import { useState } from "react";
import { API } from "@/services/api";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const [questions, setQuestions] = useState([
    { type: "MCQ", count: 5, marks: 1 }
  ]);

  const handleSubmit = async () => {
    const res = await API.post("/assignments", {
      title: "Electricity Test",
      dueDate: "2026-03-25",
      questions,
      instructions: "Attempt all questions"
    });

    router.push(`/output?id=${res.data.assignment._id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Create Assignment
      </h1>

      {questions.map((q, i) => (
        <div key={i} className="flex gap-4 mb-4">
          <input
            value={q.type}
            onChange={(e) => {
              const updated = [...questions];
              updated[i].type = e.target.value;
              setQuestions(updated);
            }}
            className="border p-2"
          />

          <input
            type="number"
            value={q.count}
            onChange={(e) => {
              const updated = [...questions];
              updated[i].count = Number(e.target.value);
              setQuestions(updated);
            }}
            className="border p-2"
          />

          <input
            type="number"
            value={q.marks}
            onChange={(e) => {
              const updated = [...questions];
              updated[i].marks = Number(e.target.value);
              setQuestions(updated);
            }}
            className="border p-2"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Generate Assignment
      </button>
    </div>
  );
}