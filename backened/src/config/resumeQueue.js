require('dotenv').config()
const { Queue } = require('bullmq')

// Use REDIS_URL if provided, otherwise fall back to host/port/password
const connection = process.env.REDIS_URL
  ? process.env.REDIS_URL
  : {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
    }

const resumeQueue = new Queue('resume generation', { connection })

module.exports = resumeQueue
