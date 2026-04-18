import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const volunteer = await prisma.volunteer.update({
      where: { id: params.id },
      data: {
        status: body.status,
      },
    });
    return NextResponse.json(volunteer);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar voluntario' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.volunteer.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar voluntario' }, { status: 500 });
  }
}
