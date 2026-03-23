import dotenv from "dotenv";
dotenv.config();   

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateQuestions = async (input: any) => {
  const prompt = `
Create a school question paper.

Requirements:
- Sections (A, B)
- Each section has:
  - title
  - instruction
  - questions

Each question must include:
- text
- difficulty (easy, medium, hard)
- marks

Return ONLY JSON in this format:
{
  "title": "",
  "subject": "",
  "class": "",
  "sections": []
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  const text = response.choices[0].message.content || "";

  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch {
    const cleaned = text.replace(/```json|```/g, "");
    parsed = JSON.parse(cleaned);
  }

  return parsed;
};