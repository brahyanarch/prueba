import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


// Método GET
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const nombre = searchParams.get("nombre");
    const password = searchParams.get("password");

    // Validar que los parámetros existan
    if (!nombre || !password) {
      return NextResponse.json(
        { message: "Nombre y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const usuario = await prisma.user.findFirst({
      where: {
        nombre: nombre,
        password: password,
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}

// Método POST - Creación de un nuevo usuario
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, password } = body;

    if (!nombre || !password) {
      return NextResponse.json(
        { message: "Nombre y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        nombre,
        password,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}

// Método DELETE
export function DELETE() {
  return NextResponse.json({
    message: "Eliminando usuario...",
  });
}

// Método PUT
export function PUT() {
  return NextResponse.json({
    message: "Actualizando usuario...",
  });
}
