import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import ResponseWrapper from "@/helpers/responseWrapper";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return ResponseWrapper(false, "Not authenticated", 401);
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const messageEmpty = await UserModel.findById(userId)
      .where("messages")
      .size(0);
    if (messageEmpty) {
      return ResponseWrapper(true, "There are no messages yet", 200);
    }
    const user = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    if (!user || user.length === 0) {
      return ResponseWrapper(false, "User not found", 401);
    }
    return ResponseWrapper(true, { message: user[0].messages }, 201);
  } catch (error) {
    console.log("An unexpected error occoured", error);
    // TODO: check response if needed
    return ResponseWrapper(false, "An unexpected error occoured", 500);
  }
}
