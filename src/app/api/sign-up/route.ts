import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "username is already taken",
        },
        { status: 400 }
      );
    } else {
      const existingUserByEmail = await UserModel.findOne({ email });

      // const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const verifyCode = "296077";
      //   let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      if (existingUserByEmail) {
        if (existingUserByEmail.isVerified) {
          return Response.json(
            {
              success: false,
              message: "User already exists with this email",
            },
            { status: 400 }
          );
        } else {
          const hashedPassword = await bcrypt.hash(password, 6);
          existingUserByEmail.password = hashedPassword;
          existingUserByEmail.verifyCode = verifyCode;
          existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
          await existingUserByEmail.save();
        }
      } else {
        const hashedPassword = await bcrypt.hash(password, 6);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const newUser = new UserModel({
          username,
          email,
          password: hashedPassword,
          verifyCode,
          verifyCodeExpiry: expiryDate,
          isVerified: false,
          isAcceptingMessages: true,
          messages: [],
        });
        await newUser.save();
      }
      //   Send verification email
      const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
      );
      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }
      return Response.json(
        {
          success: true,
          message: "User registered successfully, Please verify your email",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
