import Scheduler from "@/models/Scheduler";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// export const runtime = 'edge'; // 'nodejs' is the default

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Change Here -- JUST For test purposes
    if (session) {
      await connectToDB();
      const userId = session?.user?.id;
      const schedule = await Scheduler.find({userId}); // Find schedule based on userId
      return NextResponse.json(schedule);
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

export async function PUT(request) {
  await connectToDB();
  
  try {
    const body = await request.json();
    // console.log(body._id);
    const eventUpdated = await Scheduler.findByIdAndUpdate(body._id, body, {
      new: true,
    });

    if (eventUpdated) {
      // console.log("Event Updated Successfully");
    }

    // If Event Is Not Found Create a New Event
    if (!eventUpdated) {
      const newSchedule = new Scheduler(body);
      const savedSchedule = await newSchedule.save();
      return NextResponse.json(savedSchedule);
    }

    return NextResponse.json(eventUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request) {
  await connectToDB();  

  try {
    const body = await request.json();
    const eventDeleted = await Scheduler.findByIdAndDelete(body._id);

    if (!eventDeleted)
      return NextResponse.json(
        {
          message: "Event not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(eventDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
