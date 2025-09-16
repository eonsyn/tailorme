require('dotenv').config()
const Resume = require('../models/Resume')
const Profile = require('../models/Profile')
const User = require('../models/User')  
const { resumeValidation } = require('../utils/validators') 
const {resumeQueue}=require('../queues/resumeQueue')

const generate = async (req, res, next) => {
  try {
    const { error, value } = resumeValidation.generate.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { jobDescription } = value;
    const user = await User.findById(req.user.userId);
if(user.credits<=0){
  user.credits -=2;
}
    const profile = await Profile.findOne({ user: req.user.userId });
    if (!profile) {
      return res.status(400).json({ success: false, message: "Please complete your profile first" });
    }

    // 🟢 push full profile JSON (not just ID)
    const job = await resumeQueue.add("tailorResume", {
      userId: req.user.userId,
      profile: profile.toObject(), // convert Mongoose doc → plain JSON
      jobDescription,
    },{
    removeOnComplete: { age: 300 }, // ⏳ auto-remove after 300s (5 mins)
    removeOnFail: { age: 300 },     // ⏳ failed jobs also auto-remove
  });

    res.json({
      success: true,
      message: "Resume generation started",
      jobId: job.id,
    });
  } catch (error) {
    next(error);
  }
};


const getJobStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await resumeQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const state = await job.getState();
    const progress = job.progress;
    let response = { success: true, state, progress };

    if (state === "completed") {
      response.result = job.returnvalue; // ✅ resume result
    } else if (state === "failed") {
      response.error = job.failedReason;
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
};


const saveResume = async (req, res, next) => {

  try {
    const { title, content } = req.body

    const resume = new Resume({
      user: req.user.userId,
      title,
      content,
    })

    await resume.save()

    res.json({
      success: true,
      message: 'Resume saved successfully',
      resume,
    })
  } catch (error) {
    next(error)
  }
}

const getResumeHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const resumes = await Resume.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Resume.countDocuments({ user: req.user.userId })

    res.json({
      success: true,
      resumes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  generate,
  getJobStatus,
  saveResume,
  getResumeHistory,
}