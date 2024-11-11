// pages/api/forms/[id]/questions.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(request: Request) {
  try {
    const { questionText, type, options, formId } = await request.json();

    const newQuestion = await prisma.question.create({
      data: {
        questionText,
        type,
        form: {
          connect: { id: formId },
        },
        options: {
          create: options ? options.map((option: string) => ({ value: option })) : [],
        },
      },
    });

    return NextResponse.json(newQuestion);
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}
