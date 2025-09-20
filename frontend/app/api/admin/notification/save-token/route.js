// api/admin/notification/save-token/route.js
import User from '@/models/Users';
import connectDB from '@/utils/db';

export async function POST(req) {
  await connectDB();

  const { token } = await req.json();

  if (!token) {
    return Response.json({ error: 'Missing token' }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ UserToken: token });
    if (existingUser) {
      return Response.json({ success: true, user: existingUser });
    }
    const response = await User.create({ UserToken: token });
    return Response.json({ success: true, user: response });
  } catch (error) {
    console.error('DB Error:', error);
    return Response.json({ error: 'Failed to save token' }, { status: 500 });
  }
}
