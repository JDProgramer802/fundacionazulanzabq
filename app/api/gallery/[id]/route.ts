import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const item = await prisma.galleryItem.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        image_url: body.image_url,
        category: body.category,
        active: body.active,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar la galería' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    await prisma.galleryItem.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar de la galería' }, { status: 500 });
  }
}
