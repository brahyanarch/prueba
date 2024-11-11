// pages/api/forms/[id]/answers.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const formId = parseInt(req.query.id as string, 10);

  if (req.method === 'POST') {
    const { answers } = req.body;

    try {
      const createdAnswers = await Promise.all(
        answers.map(async (answer: { questionId: number; value: string }) => {
          return await prisma.answer.create({
            data: {
              value: answer.value,
              question: {
                connect: { id: answer.questionId },
              },
              form: {
                connect: { id: formId },
              },
            },
          });
        })
      );

      res.status(201).json(createdAnswers);
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar las respuestas' });
    }
  }
}
