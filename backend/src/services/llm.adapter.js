// src/services/LLMAdapter.js
const OpenAI = require("openai")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const env = require("../config/env")

class LLMAdapter {
  constructor() {
    this.provider = env.LLM_PROVIDER

    if (this.provider === "openai") {
      this.openai = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      })
    }

    if (this.provider === "gemini") {
      this.gemini = new GoogleGenerativeAI(env.GEMINI_API_KEY)
      this.geminiModel = this.gemini.getGenerativeModel({
        model: "gemini-2.5-flash", // fast and cost-effective
      })
    }
  }

  async tailorResume(profile, jobDescription) {
     
    if (this.provider === "mock") {
      return this.mockTailorResume(profile, jobDescription)
    }
    if (this.provider === "openai") {
      return this.openaiTailorResume(profile, jobDescription )
    }
    if (this.provider === "gemini") {
      return this.geminiTailorResume(profile, jobDescription )
    }

    throw new Error(`Unsupported LLM provider: ${this.provider}`)
  }

  async openaiTailorResume(profile, jobDescription ) {
    try {
      const prompt = this.buildTailoringPrompt(profile, jobDescription )

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert resume writer and career coach. Tailor resumes truthfully while aligning with the job description.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      })

      let raw = completion.choices[0].message.content.trim()

      // Clean markdown if OpenAI wraps in code block
      raw = raw.replace(/```json/g, "").replace(/```/g, "").trim()

      return JSON.parse(raw)
    } catch (error) {
      console.error("OpenAI API Error:", error)
      throw new Error("Failed to generate tailored resume with OpenAI")
    }
  }

  async geminiTailorResume(profile, jobDescription ) {
     
    try {
      const prompt = this.buildTailoringPrompt(profile, jobDescription )

      const response = await this.geminiModel.generateContent(prompt)

      let text = response.response.candidates[0].content.parts[0].text.trim()

      // 🧹 Clean Markdown fences like ```json ... ```
      text = text.replace(/```json/g, "").replace(/```/g, "").trim()

      // Try extracting only JSON if Gemini adds extra text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        text = jsonMatch[0]
      }

      return JSON.parse(text)
    } catch (error) {
      console.error("Gemini API Error:", error)
      throw new Error("Failed to generate tailored resume with Gemini")
    }
  }


  buildTailoringPrompt(profile, jobDescription) {
  return `
Please tailor the following resume to match the job description below. 
Maintain factual accuracy but optimize presentation, keywords, and emphasis 
to align with the job requirements.

CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

JOB DESCRIPTION:
${jobDescription}

Return a single JSON object with the following structure: 
⚠️ Do NOT invent or add extra data or even icon or logo in it. 
If any section (like projects) is missing in the candidate profile, exclude it.

{
  "resume": {
    "name": "candidate name",
    "title": "professional title matching role",
    "contact": {
      "email": "email",
      "phone": "phone",
      "location": "location"
    },
    "summary": "3-4 sentence professional summary tailored to this role",
    "skills": ["top 8-10 relevant skills"],
    "experience": [
      {
        "title": "job title",
        "company": "company name",
        "location": "location",
        "startDate": "start date",
        "endDate": "end date or Present",
        "current": boolean,
        "description": "tailored description emphasizing relevant experience",
        "achievements": ["3-5 quantified achievements relevant to role"]
      }
    ],
    "education": [
      {
        "degree": "degree name",
        "institution": "school name",
        "location": "location",
        "startYear": "year",
        "endYear": "year",
        "gpa": "gpa if provided"
      }
    ],
    "projects": [
      {
        "name": "project title",
        "description": "brief tailored description of project",
        "technologies": ["list", "of", "tech stack"],
        "link": "project URL if provided"
      }
    ]
  },

  "coverLetter": {
    "greeting": "Dear Hiring Manager,",
    "intro": "Opening paragraph introducing the candidate and role interest",
    "body": [
      "Paragraph 1: Highlight most relevant skills and achievements",
      "Paragraph 2: Align past experience with job requirements",
      "Paragraph 3 (optional): Why candidate is a cultural or mission fit"
    ],
    "closing": "Closing paragraph expressing enthusiasm and availability",
    "signoff": "Sincerely,",
    "signature": "Candidate Name"
  },

  "improvementTips": [
    "Tip 1: Concrete suggestion to increase hiring chances",
    "Tip 2: Another practical and actionable improvement"
  ],

  "practiceFocus": [
    "Point 1: Practical skill-building or preparation activity",
    "Point 2: Main area to focus on for career growth",
    "Point 3: Strategy to improve alignment with target jobs"
  ]
}

Focus on:
1. Use keywords from the job description
2. Emphasize relevant experience, skills, and projects
3. Quantify achievements where possible
4. Maintain truthfulness to the original profile
5. Optimize for ATS systems
6. Add all Schooling detail
7. Provide clear, professional, and concise cover letter text
8. Give exactly 2 improvement tips and 3 practice focus points
`
}

  
}

module.exports = new LLMAdapter()
