require('dotenv').config()
const { Worker } = require('bullmq')
const llmAdapter = require('../services/llm.adapter')
const Resume = require('../models/Resume')

// Use either REDIS_URL or individual host/port/password
const redisConnection = process.env.REDIS_URL
  ? process.env.REDIS_URL
  : {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
    }

// Resume generation worker
const resumeWorker = new Worker(
  'resume generation',
  async (job) => {
    const { userId, profile, jobDescription, templateId } = job.data

    try {
      await job.updateProgress(25)

      // Generate tailored resume using LLM
      const tailoredResume = await llmAdapter.tailorResume(
        profile,
        jobDescription,
        templateId
      )

      await job.updateProgress(75)

      // Additional processing can be added here

      await job.updateProgress(100)

      return tailoredResume
    } catch (error) {
      console.error('Resume generation error:', error)
      throw error
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
)

resumeWorker.on('completed', (job) => {
  console.log(`✅ Resume generation job ${job.id} completed`)
})

resumeWorker.on('failed', (job, err) => {
  console.error(`❌ Resume generation job ${job.id} failed:`, err.message)
})

console.log('🔄 Resume generation worker started')

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('📴 Shutting down workers...')
  await resumeWorker.close()
  process.exit(0)
})
