import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const data = await request.json();
    const appointment = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        status: data.status,
        notes: data.notes,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar cita' }, { status: 500 });
  }
}
