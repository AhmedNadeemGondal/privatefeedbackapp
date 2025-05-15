import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    // const decodedUsername = decodeURIComponent(username); //This is just for info not valid for the current implementation

    const usernameSchemaChecked = UsernameQuerySchema.safeParse({ username });
    console.log(usernameSchemaChecked);
    if (!usernameSchemaChecked.success) {
      return Response.json(
        {
          success: false,
          message: usernameSchemaChecked.error.errors[0].message,
        },
        { status: 400 }
      );
    }
    console.log(usernameSchemaChecked);
    const user = await UserModel.findOne({
      username: usernameSchemaChecked.data.username,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 500 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    console.log(user.verifyCode, code, isCodeValid);
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, please sign-up again to get a new code",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      { status: 500 }
    );
  }
}
