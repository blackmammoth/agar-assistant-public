import Task from "@/models/Task";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      await connectToDB();
      const userId = session?.user?.id;
      const tasks = await Task.find({ userId }); // Find tasks based on userId
      return NextResponse.json(tasks);
    } else {
      // Handle the case when there is no session (unauthenticated user)
      return NextResponse.json(
        { message: "User is not authenticated." },
        {
          status: 401, // Use a 401 status code for unauthenticated users
        }
      );
    }
  } catch (error) {
    // You can do something like this:
    console.error(error); // Log the error
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      }
    );
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
    return NextResponse.json(
      { error: "Invalid request data" },
      {
        status: 400,
      }
    );
  }
}

