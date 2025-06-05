import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import ResponseWrapper from "@/helpers/responseWrapper";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  const messageId = params.messageId;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return ResponseWrapper(false, "Not authenticated", 401);
  }
  try {
    const updatedResult = await UserModel.updateOne(
      {
        _id: user._id,
      },
      { $pull: { messages: { _id: messageId } } }
    );
    if (updatedResult.modifiedCount === 0) {
      return ResponseWrapper(false, "Message not found/already deleted", 404);
    }
    return ResponseWrapper(true, "Message Deleted", 200);
  } catch (error) {
    console.log("Dump Error: ", error);
    return ResponseWrapper(false, "Error deleting message", 500);
  }
}
