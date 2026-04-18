import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(volunteers);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener voluntarios' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const volunteer = await prisma.volunteer.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        interests: body.interests,
        status: 'pendiente',
      },
    });
    return NextResponse.json(volunteer);
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar voluntario' }, { status: 500 });
  }
}
