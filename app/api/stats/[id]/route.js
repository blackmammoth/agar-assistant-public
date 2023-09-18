import Stats from "@/models/Stats";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";

export async function GET(request, { params }) {

    connectToDB;
    try {
        const statsFound = await Stats.findById(params.id);
    
        if (!statsFound)
          return NextResponse.json(
            {
              message: "Stats not found",
            },
            {
              status: 404,
            }
          );
    
        return NextResponse.json(statsFound);
      } catch (error) {
        return NextResponse.json(error.message, {
          status: 400,
        });
      }

}

export async function PUT(request, { params }) {
    await connectToDB;
    const body = await request.json();
    
    try {
      const statsUpdated = await Stats.findByIdAndUpdate(params.id, body, {
        new: true,
      });
  
      if (!statsUpdated)
        return NextResponse.json(
          {
            message: "Stats not found",
          },
          {
            status: 404,
          }
        );
  
      return NextResponse.json(statsUpdated);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }
  
  export async function DELETE(request, { params }) {
    await connectToDB;
  
    try {
      const statsDeleted = await Stats.findByIdAndDelete(params.id);
  
      if (!statsDeleted)
        return NextResponse.json(
          {
            message: "Stats not found",
          },
          {
            status: 404,
          }
        );
  
      return NextResponse.json(statsDeleted);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }
  