// pages/api/forms.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";// Asegúrate de configurar tu cliente Prisma


export async function POST(request: Request) {
    try {
      const { name} = await request.json();
  
      const newForm = await prisma.form.create({
        data: {
          name,
        },
      });
  
      return NextResponse.json(newForm);
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