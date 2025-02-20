require('dotenv').config();
const axios = require('axios');
const pdfText = require('pdf-text');
const mongoose = require('mongoose');
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const Applicant = require('../models/userModel');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

const extractTextFromPDFUrl = async (pdfUrl) => {
  try {
    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });

    const extractedText = await new Promise((resolve, reject) => {
      pdfText(response.data, (err, chunks) => {
        if (err) return reject(new Error("Failed to extract text or invalid PDF"));

        const text = chunks.join(' ');
        if (!text) return reject(new Error("No text detected in the PDF"));

        resolve(text);
      });
    });

    console.log("Extracted Text:", extractedText.substring(0, 500)); // Debugging
    return extractedText;
  } catch (err) {
    throw new Error(`Error extracting text: ${err.message}`);
  }
};

const structureWithLLM = async (extractedText) => {
    try {
      const prompt = `
Extract resume information with EXTREME PRECISION following these rules:

1. OUTPUT FORMAT: Strictly use this JSON structure:
{
  "name": "Full Name",
  "email": "valid@email.com",
  "education": [
    {
      "degree": "Degree Name",
      "branch": "Field of Study (optional)",
      "institution": "University Name",
      "year": Graduation Year as integer
    }
  ],
  "experience": [
    {
      "job_title": "Position Name",
      "company": "Company Name",
      "start_date": "DD/MM/YY",
      "end_date": "DD/MM/YY or 'Working'"
    }
  ],
  "skills": ["Skill1", "Skill2"],
  "summary": "2-3 line career summary"
}

2. DATA RULES:
- Dates: ALWAYS use DD/MM/YY format (e.g., "15/08/23")
- Current jobs: Use "Working" for end_date
- Education year: Integer from 4-digit year (e.g., 2023 → 2023)
- Branch: Include only if specified in resume
- Skills: Extract TECHNICAL skills only, minimum 3 items
- Email: Validate format, use "N/A" if missing

3. PROCESSING RULES:
- Never invent data - use "N/A" for missing required fields
- Handle name variations (e.g., "John D." → "John Doe")
- Convert month names to numbers (e.g., "August 2023" → "01/08/23")
- For education without year: Use latest education year - 4
- Summary: Combine objective and key achievements

EXAMPLE INPUT:
"MIT | MS Computer Science 2022 | GPA 3.8
Google | SWE | Jun 2022-Present | Built Gemini API"

EXAMPLE OUTPUT:
{
  "name": "John Doe",
  "email": "john@mit.edu",
  "education": [{
    "degree": "MS",
    "branch": "Computer Science",
    "institution": "MIT",
    "year": 2022
  }],
  "experience": [{
    "job_title": "Software Engineer",
    "company": "Google",
    "start_date": "01/06/22",
    "end_date": "Working"
  }],
  "skills": ["Python", "Machine Learning", "API Development"],
  "summary": "Software engineer with experience building AI APIs at Google. MS in Computer Science from MIT with focus on machine learning applications."
}

RESUME TO PROCESS:
${extractedText}

YOUR STRICT JSON RESPONSE (NO COMMENTS, NO MARKDOWN):
`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      console.log("Raw LLM Response:", responseText);

      try {
        return JSON.parse(responseText);
      } catch (jsonError) {
        throw new Error("Invalid JSON format in LLM response");
      }
    } catch (error) {
      throw new Error("Failed to structure extracted text with LLM: " + error.message);
    }
  };

const saveToDatabase = async (data) => {
  try {
    const applicant = new Applicant({
      name: data.name,
      email: data.email,
      education: data.education.map(edu => ({
        degree: edu.degree,
        branch: edu.branch,
        institution: edu.institution,
        year: edu.year,
      })),
      experience: data.experience.map(exp => ({
        job_title: exp.job_title,
        company: exp.company,
        start_date: exp.start_date, 
        end_date: exp.end_date || "Working", 
      })),
      skills: data.skills || [],
      summary: data.summary || '',
    });

    await applicant.save();
    console.log("Resume data saved to MongoDB successfully!");
  } catch (err) {
    console.error("Error saving to database:", err.message);
    throw new Error("Error saving to the database: " + err.message);
  }
};

const processResume = async (pdfUrl) => {
  try {
    const text = await extractTextFromPDFUrl(pdfUrl);
    const structuredData = await structureWithLLM(text);
    await saveToDatabase(structuredData);
    return structuredData;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

module.exports = processResume;
