import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener la galería' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const item = await prisma.galleryItem.create({
      data: {
        title: body.title,
        description: body.description,
        image_url: body.image_url,
        category: body.category || 'General',
        active: body.active !== undefined ? body.active : true,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear item de galería' }, { status: 500 });
  }
}
