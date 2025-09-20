import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  UserToken: { type: String, required: true, unique: true },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
