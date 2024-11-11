// pages/api/forms.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";// Asegúrate de configurar tu cliente Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name } = req.body;

    try {
      const form = await prisma.form.create({
        data: {
          name,
        },
      });
      res.status(201).json(form);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el formulario' });
    }
  }
}
