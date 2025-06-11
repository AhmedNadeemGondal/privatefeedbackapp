import ResponseWrapper from "@/helpers/responseWrapper";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";

import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  console.log(username, content);

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return ResponseWrapper(false, "User not found", 404);
    }
    // is user accepting the messages

    if (!user.isAcceptingMessages) {
      return ResponseWrapper(false, "User is not accepting messages", 403);
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return ResponseWrapper(true, "Message sent Successfully", 201);
  } catch (error) {
    console.log("Error adding messages", error);
    return ResponseWrapper(false, "Internal server error", 500);
  }
}
