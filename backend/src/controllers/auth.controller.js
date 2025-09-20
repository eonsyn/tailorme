const User = require('../models/User')
const Profile = require('../models/Profile')
const jwt = require('../services/jwt')
const { authValidation } = require('../utils/validators')

const signup = async (req, res, next) => {
  try {
    const data = req.body; 
    const { error, value } = authValidation.signup.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    const { name, email, password, username, referralCode, deviceFingerprint } = value
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      })
    }


    // Check for referral abuse only if referralCode is provided
    if (referralCode) {
      const abuseCheck = await User.findOne({
        $or: [
          { ipAddress },
          { deviceFingerprint }
        ],
        'referral.referredBy': { $ne: null }
      })

      if (abuseCheck) {
        return res.status(400).json({
          success: false,
          message: 'Referral signup not allowed from this device or IP.'
        })
      }
    }


    // Handle referral
    let referredBy = null
    if (referralCode) {
      referredBy = await User.findOne({ username: referralCode })
      if (!referredBy) {
        return res.status(400).json({ success: false, message: 'Invalid referral code' })
      }
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      username,
      ipAddress,
      deviceFingerprint,
      credits: referredBy ? 20 : 10,
      referral: { referredBy: referredBy?._id }
    })

    await user.save()

    // Handle referral rewards safely
    if (referredBy) {
      // Avoid double reward
      const alreadyReferred = referredBy.referral.referredUsers
        .some(r => r.user.toString() === user._id.toString())

      if (!alreadyReferred) {
        referredBy.referral.referredUsers.push({ user: user._id })
        referredBy.credits += 50
        await referredBy.save()
      }
    }

    // Create empty profile
    const profile = new Profile({
      user: user._id,
      name,
      email,
    })
    await profile.save()


    // Generate tokens
    const accessToken = jwt.generateAccessToken(user._id)
    const refreshToken = jwt.generateRefreshToken(user._id)
    jwt.setTokenCookies(res, accessToken, refreshToken)

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: user.toJSON(),
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { error, value } = authValidation.login.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    const { email, password } = value

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Update last login
    user.lastLoginAt = new Date()
    await user.save()

    // Generate tokens
    const accessToken = jwt.generateAccessToken(user._id)
    const refreshToken = jwt.generateRefreshToken(user._id)

    // Set cookies
    jwt.setTokenCookies(res, accessToken, refreshToken)

    res.json({
      success: true,
      message: 'Login successful',
      user: user.toJSON(),
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res) => {
  jwt.clearTokenCookies(res)
  
  res.json({
    success: true,
    message: 'Logout successful',
  })
}

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided',
      })
    }

    const decoded = jwt.verifyRefreshToken(refreshToken)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      })
    }

    // Generate new access token
    const accessToken = jwt.generateAccessToken(user._id)
    jwt.setAccessTokenCookie(res, accessToken)

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      user: user.toJSON(),
    })
  } catch (error) {
    jwt.clearTokenCookies(res)
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
    })
  }
}

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-updatedAt -createdAt -__v -password") // ❌ exclude unwanted fields
      .lean(); // ✅ return plain JS object (faster, easier to modify)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Only keep last 5 payments (sorted by createdAt descending)
    if (user.payments && user.payments.length > 0) {
      user.payments = user.payments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  refresh,
  me,
}