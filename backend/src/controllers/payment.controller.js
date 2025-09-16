const Razorpay = require("razorpay");
const crypto = require("crypto");
const env = require("../config/env");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const paymentSuccessTemplate = require('../../public/paymentSuccessTemplate')

// 🎯 Credit Packs
const CREDIT_PLANS = {
  basic: { credits: 30, price: 20 },
  standard: { credits: 100, price: 40 }, // ⭐ Most Popular
  premium: { credits: 250, price: 100 },
};

//   Create Payment Order
const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });

    const { plan, currency } = req.body;
    if (!plan || !CREDIT_PLANS[plan]) {
      return res.status(400).json({ success: false, message: "Invalid plan selected" });
    }

    const { price } = CREDIT_PLANS[plan];
    const options = {
      amount: price * 100, // paise
      currency: currency || "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//   Verify Payment & Add Credits
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, plan } = req.body;

    if (!userId || !plan || !CREDIT_PLANS[plan]) {
      return res.status(400).json({ success: false, message: "User ID and valid plan are required" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "❌ Payment verification failed" });
    }

    //   Payment verified
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const { credits, price } = CREDIT_PLANS[plan];
    user.credits += credits; 
    // Save payment history (amount stored in paise)
    user.payments.push({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: price * 100, // paise
      credit: credits,
      currency: "INR",
      plan,
      status: "success",
    });

    await user.save();

    //   Send Email
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: false,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    }); 
    await transporter.sendMail({
      from: `"Tailor Me" <${env.SMTP_USER}>`,
      to: user.email,
      subject: "Credits Purchased - Tailor Me",
      html:paymentSuccessTemplate(user, plan, credits,price),
    });

    res.json({ success: true, message: `  ${credits} credits added to your account!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, verifyPayment };
