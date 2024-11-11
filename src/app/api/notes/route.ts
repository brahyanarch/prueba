import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    //throw new Error('Something wrong');
    const notes = await prisma.note.findMany();
    
  console.log("get notas");
    console.log(notes);
  console.log("get notas");

    return NextResponse.json(notes);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export function DELETE() {
  return NextResponse.json({
    message: "Delete single note...",
  });
}

export function PUT() {
  return NextResponse.json({
    message: "updating single note ...",
  });
}
