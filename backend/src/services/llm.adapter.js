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
        model: "gemini-1.5-flash", // fast and cost-effective
      })
    }
  }

  async tailorResume(profile, jobDescription, templateId) {
    console.log("hi i am call here 1")
    if (this.provider === "mock") {
      return this.mockTailorResume(profile, jobDescription)
    }
    if (this.provider === "openai") {
      return this.openaiTailorResume(profile, jobDescription, templateId)
    }
    if (this.provider === "gemini") {
      return this.geminiTailorResume(profile, jobDescription, templateId)
    }

    throw new Error(`Unsupported LLM provider: ${this.provider}`)
  }

  async mockTailorResume(profile, jobDescription) {
    return {
      name: profile.name || "John Doe",
      title: profile.title || "Software Engineer",
      contact: {
        email: profile.email || "john@example.com",
        phone: profile.phone || "+1 (555) 123-4567",
        location: profile.location || "San Francisco, CA",
      },
      summary: `Experienced ${profile.title || "professional"} with expertise in modern technologies. Proven track record of delivering high-quality solutions and working effectively in collaborative environments.`,
      skills:
        profile.skills?.slice(0, 8) || [
          "JavaScript",
          "React",
          "Node.js",
          "Python",
          "SQL",
          "AWS",
          "Docker",
          "Git",
        ],
      experience:
        profile.experience || [
          {
            title: "Senior Software Engineer",
            company: "Tech Company",
            location: "San Francisco, CA",
            startDate: "Jan 2022",
            endDate: "Present",
            current: true,
            description:
              "Led development of scalable web applications using modern technologies.",
            achievements: [
              "Improved application performance by 40%",
              "Led team of 5 engineers",
              "Implemented CI/CD pipeline",
            ],
          },
        ],
      education:
        profile.education || [
          {
            degree: "Bachelor of Science in Computer Science",
            institution: "University of Technology",
            location: "San Francisco, CA",
            startYear: "2018",
            endYear: "2022",
            gpa: "3.8",
          },
        ],
    }
  }

  async openaiTailorResume(profile, jobDescription, templateId) {
    try {
      const prompt = this.buildTailoringPrompt(profile, jobDescription, templateId)

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

  async geminiTailorResume(profile, jobDescription, templateId) {
     
    try {
      const prompt = this.buildTailoringPrompt(profile, jobDescription, templateId)

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

Return a JSON object with this structure. 
⚠️ Do NOT invent or add extra data. 
If any section (like projects) is missing in the candidate profile, exclude it.

{
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
}

Focus on:
1. Use keywords from the job description
2. Emphasize relevant experience, skills, and projects
3. Quantify achievements where possible
4. Maintain truthfulness to the original profile
5. Optimize for ATS systems
`
  }
}

module.exports = new LLMAdapter()
