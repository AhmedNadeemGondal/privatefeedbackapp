import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  // TODO: Next now handles this on it's own; use this in all other routes to check request "Verb"
  // if (request.method !== "GET") {
  //   return Response.json(
  //     {
  //       success: false,
  //       message: "Only accepts GET method",
  //     },
  //     { status: 405 }
  //   );
  // }

  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    // localhost:/3000/api/something?username=ahmed
    const queryParam = { username: searchParams.get("username") };
    // Validate with Zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result); // TODO: remove

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is unique,",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "error checking username",
      },
      { status: 500 }
    );
  }
}
