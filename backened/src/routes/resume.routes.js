const express = require('express')
const resumeController = require('../controllers/resume.controller')
const { authenticate } = require('../middlewares/auth')

const router = express.Router()

// All resume routes require authentication
router.use(authenticate)

router.post('/generate', resumeController.generate)
router.get('/job/:jobId', resumeController.getJobStatus)
router.post('/save', resumeController.saveResume)
router.get('/history', resumeController.getResumeHistory)

module.exports = router