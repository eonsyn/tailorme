// api/admin/notification/route.js
import { messaging } from '@/lib/firebaseAdmin'; // Assumes firebaseAdmin.js correctly initializes Admin SDK
import User from '@/models/Users';
import connectDB from '@/utils/db';

export async function POST(req) {
  await connectDB();

  const { title,imageUrl, body, link } = await req.json();

  // Validate required fields early
  if (!title || !body || !link || !imageUrl) {
    return Response.json({ error: 'Missing fields: title, body, or link' }, { status: 400 });
  }

  try {
    // Get all users with tokens
    const users = await User.find({});

    // If no users are found at all, return immediately
    if (!users || users.length === 0) {
      return Response.json({ error: 'No registered users found in the database.' }, { status: 404 });
    }

    // Prepare an array of valid messages for batch sending
    const messages = [];
    const tokensToRemove = []; // To store invalid tokens for cleanup

    for (const user of users) {
      const token = user.UserToken;
      if (token) { // Only add messages for users who actually have a token
        messages.push({
          token,
          notification: {
            title,
            body,
             image: imageUrl, 
          },
          data: {
            click_action: link, // This is explicitly needed by your service worker
            title, // Good to include in data as well
            body,  // Good to include in data as well
             image: imageUrl, 
          },
        });
      }





    }

 
    if (messages.length === 0) {
      console.warn('No valid FCM tokens found among users to send notifications.');
      return Response.json({ error: 'No valid tokens found to send notifications.' }, { status: 404 });
    }

    
    const response = await messaging.sendEach(messages); // Use sendEach for an array of individual message objects

    console.log('FCM SendEach Response:', response); // Log for sendEach

    // Handle failed tokens (e.g., unregistered, invalid, etc.)
    if (response.failureCount > 0) {
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const failedToken = messages[idx].token;
          console.warn(`Failed to send notification to token ${failedToken}:`, resp.error);
          // Store these tokens to remove them from your DB later (important for deliverability)
          if (resp.error && (
              resp.error.code === 'messaging/invalid-registration-token' ||
              resp.error.code === 'messaging/registration-token-not-registered' ||
              resp.error.code === 'messaging/mismatched-sender-id'
             )) {
            tokensToRemove.push(failedToken);
          }
        }
      });

      // Optionally, remove invalid tokens from your database
      if (tokensToRemove.length > 0) {
        console.log(`Removing ${tokensToRemove.length} invalid tokens from DB.`);
        await User.deleteMany({ UserToken: { $in: tokensToRemove } });
      }
    }

    // Return a success response with details
    return Response.json({
        success: true,
        sentCount: response.successCount,
        failureCount: response.failureCount,
        message: `${response.successCount} notifications sent successfully, ${response.failureCount} failed.`
    });

  } catch (error) {
    console.error('❌ FCM Error during send:', error); // More specific error log
    // Be specific about the error for better debugging
    if (error.code === 'messaging/invalid-argument' || error.code === 'messaging/mismatched-sender-id') {
      return Response.json({
        error: 'Invalid argument for FCM message or sender ID mismatch.',
        details: error.message
      }, { status: 400 });
    }
    // Catch all other unexpected errors
    return Response.json({ error: 'Failed to send notifications', details: error.message }, { status: 500 });
  }
}