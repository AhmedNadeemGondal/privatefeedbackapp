import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import ResponseWrapper from "@/helpers/responseWrapper";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return ResponseWrapper(false, "Not authenticated", 401);
  }
  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return ResponseWrapper(
        false,
        "Failed to update user status to accept messages",
        401
      );
    }
    // TODO: Check this responsewrapper if something messes up 14 May 2025
    return ResponseWrapper(
      true,
      {
        message: "Message accepting status updated successfully",
        user: updatedUser,
      },
      201
    );
  } catch (error) {
    console.log("Failed to update user status to accept messages", error);
    return ResponseWrapper(
      false,
      "Failed to update user status to accept messages",
      500
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return ResponseWrapper(false, "Not authenticated", 401);
  }
  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return ResponseWrapper(false, "User not found", 404);
    }
    // TODO: Modify the response wrapper message object if needed
    return ResponseWrapper(
      true,
      { message: foundUser.isAcceptingMessages },
      200
    );
  } catch (error) {
    console.log("Error in getting message acceptance status", error);
    return ResponseWrapper(
      false,
      "Error in getting message acceptance status",
      500
    );
  }
}
