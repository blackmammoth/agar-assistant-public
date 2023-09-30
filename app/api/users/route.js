import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return unauthenticatedResponse();
    }

    await connectToDB();
    const userId = session?.user?.id;
    const user = await User.find({ userId });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse();
  }
}

export async function PUT(request) {
  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return unauthenticatedResponse();
    }
    await connectToDB();

    const body = await request.json();
    const userId = session?.user?.id;

    console.log(body)

    try {
        const userUpdated = await User.findByIdAndUpdate(userId, body, {
          new: true,
        });
    
        if (!userUpdated)
          return NextResponse.json(
            {
              message: "User not found",
            },
            {
              status: 404,
            }
          );
    
        return NextResponse.json(userUpdated);
      } catch (error) {
        return NextResponse.json(error.message, {
          status: 400,
        });
      }
  } catch (error) {
    console.error(error);
    return badRequestResponse("Invalid request data");
  }
}

function unauthenticatedResponse() {
  return NextResponse.json(
    { message: "User is not authenticated." },
    { status: 401 }
  );
}

function internalServerErrorResponse() {
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}

function badRequestResponse(errorMessage) {
  return NextResponse.json(
    { error: errorMessage },
    { status: 400 }
  );
}
