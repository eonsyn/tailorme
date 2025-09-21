import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("❌ MONGODB_URI not set in environment variables");
}

// Use global cache to prevent multiple connections in dev
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri, {
        dbName: "tailorblog",
        serverSelectionTimeoutMS: 10000, // fail fast if MongoDB unreachable
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
