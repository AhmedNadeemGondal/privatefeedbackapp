import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import ResponseWrapper from "@/helpers/responseWrapper";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  // console.log(user);
  if (!session || !session.user) {
    return ResponseWrapper(false, "Not authenticated", 401);
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  // console.log(userId);
  try {
    const messageEmpty = await UserModel.findById(userId)
      .where("messages")
      .size(0);
    if (messageEmpty) {
      return ResponseWrapper(true, "There are no messages yet", 200);
    }
    const messages = await UserModel.aggregate([
      { $match: { _id: userId } }, // ← fix here
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $replaceRoot: { newRoot: "$messages" } },
    ]);
    // console.log(messages);
    // const user = await UserModel.find({ _id: userId });
    // console.log(user);
    if (!messages || messages.length === 0) {
      return Response.json(
        { messages },
        {
          status: 200,
        }
      );
    }
    return ResponseWrapper(true, { message: messages }, 201);
  } catch (error) {
    console.log("An unexpected error occoured", error);
    // TODO: check response if needed
    return ResponseWrapper(false, "An unexpected error occoured", 500);
  }
}
