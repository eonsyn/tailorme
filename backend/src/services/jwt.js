const jwt = require('jsonwebtoken')
const env = require('../config/env')

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE,
  })
}

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRE,
  })
}

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET)
  } catch (err) {
    return null
  }
}


const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET)
}

const setTokenCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production'? 'none':'lax',
  }

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,  
  })

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,  
  })
}

const setAccessTokenCookie = (res, accessToken) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,  
  })
}

const clearTokenCookies = (res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
  }

  res.clearCookie('accessToken', cookieOptions)
  res.clearCookie('refreshToken', cookieOptions)
}

// ====================== EMAIL VERIFICATION TOKEN ======================
 
const generateEmailToken = (userId, email, options = { expiresIn: '24h' }) => {
  return jwt.sign({ userId, email }, env.JWT_EMAIL_SECRET, options)
}


const verifyEmailToken = (token) => {
  return jwt.verify(token, env.JWT_EMAIL_SECRET)
}



module.exports = {
  generateEmailToken,
  verifyEmailToken,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  setTokenCookies,
  setAccessTokenCookie,
  clearTokenCookies,
}