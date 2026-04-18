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
    const donation = await prisma.donation.update({
      where: { id: params.id },
      data: {
        status: data.status,
        verified_at: data.status === 'verificada' ? new Date() : null,
        verified_by: user.email,
        notes: data.notes,
      },
    });

    return NextResponse.json(donation);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar donación' }, { status: 500 });
  }
}
