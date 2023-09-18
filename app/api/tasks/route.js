import Task from "@/models/Task";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return unauthenticatedResponse();
    }

    await connectToDB();
    const userId = session?.user?.id;
    const tasks = await Task.find({ userId });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse();
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newTask = new Task(body);
    const savedTask = await newTask.save();
    return NextResponse.json(savedTask);
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
