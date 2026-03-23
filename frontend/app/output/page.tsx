"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API } from "@/services/api";

export default function OutputPage() {
  const params = useSearchParams();
  const id = params.get("id");

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await API.get(`/assignments/${id}`);

      if (res.data.status === "generated") {
        setData(res.data.result);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [id]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Generating question paper... ⏳
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="bg-red-500 w-full max-w-3xl p-8 rounded-lg shadow">

        <h1 className="text-2xl font-bold text-center mb-2">
          {data.title}
        </h1>

        <div className="text-center text-sm text-gray-600 mb-6">
          Subject: {data.subject} | Class: {data.class}
        </div>

        <div className="mb-6 space-y-2 text-sm text-black">
          <p>Name: __________________________</p>
          <p>Roll No: ________________________</p>
          <p>Section: ________________________</p>
        </div>

        {data.sections.map((sec: any, i: number) => (
          <div key={i} className="mb-6">

            <h2 className="text-lg font-semibold mb-1 text-black">
              {sec.title}
            </h2>

            <p className="text-gray-500 text-sm mb-3">
              {sec.instruction}
            </p>

            {sec.questions.map((q: any, j: number) => (
              <div key={j} className="mb-3 flex justify-between">

                <div>
                  {j + 1}. {q.text}
                </div>

                <div className="flex gap-2 items-center">

                  <span
                    className={`text-xs px-2 py-1 rounded text-black ${
                      q.difficulty === "easy"
                        ? "bg-green-100 text-green-600"
                        : q.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {q.difficulty}
                  </span>

                  <span className="text-sm font-medium text-black">
                    {q.marks} marks
                  </span>

                </div>

              </div>
            ))}

          </div>
        ))}

      </div>
    </div>
  );
}