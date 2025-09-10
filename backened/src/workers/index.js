const { Worker } = require('bullmq')
const llmAdapter = require('../services/llm.adapter')
const Resume = require('../models/Resume')

// Resume generation worker
const resumeWorker = new Worker('resume generation', async (job) => {
  const { userId, profile, jobDescription, templateId } = job.data
  
  try {
    // Update job progress
    await job.updateProgress(25)
    
    // Generate tailored resume using LLM
    const tailoredResume = await llmAdapter.tailorResume(profile, jobDescription, templateId)
    
    await job.updateProgress(75)
    
    // Additional processing can be added here
    
    await job.updateProgress(100)
    
    return tailoredResume
  } catch (error) {
    console.error('Resume generation error:', error)
    throw error
  }
}, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
  concurrency: 5,
})

resumeWorker.on('completed', (job) => {
  console.log(`✅ Resume generation job ${job.id} completed`)
})

resumeWorker.on('failed', (job, err) => {
  console.error(`❌ Resume generation job ${job.id} failed:`, err.message)
})

console.log('🔄 Resume generation worker started')

// Keep the worker running
process.on('SIGINT', async () => {
  console.log('📴 Shutting down workers...')
  await resumeWorker.close()
  process.exit(0)
})