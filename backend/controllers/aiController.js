import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompt.js";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc Generate interview questions and asnwers using Gemini
// @route POST /api/ai/generate-questions
// @access Private
export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    let rawText = response.text;
    //Clean it: Remove ```json and ``` from begining and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // Remove ```json at the start
      .replace(/```$/, "") // Remove ``` at the end
      .trim(); // Trim leading/trailing whitespace

    //Now safe to parse
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc Generate explain a interview questions
// @route POST /api/ai/generate-explanation
// @access Private
export const generateConceptExplanation = async (req, res) => {
  try {
    const { question} = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = conceptExplainPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    let rawText = response.text;
    //Clean it: Remove ```json and ``` from begining and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // Remove ```json at the start
      .replace(/```$/, "") // Remove ``` at the end
      .trim(); // Trim leading/trailing whitespace

    //Now safe to parse
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};
