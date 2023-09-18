import Stats from "@/models/Stats";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


// export const runtime = 'edge'; // 'nodejs' is the default

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      await connectToDB();
      const userId = session?.user?.id;
      const stats = await Stats.find({ userId });
      return NextResponse.json(stats);
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
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}

export async function POST(request) {
  // console.log("Inside POST Method")
  try {
    const body = await request.json();
    // console.log(body)
    const newStat = new Stats(body);
    const savedStat = await newStat.save();
    return NextResponse.json(savedStat);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
