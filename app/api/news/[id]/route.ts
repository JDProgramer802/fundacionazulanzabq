import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const news = await prisma.news.findUnique({
      where: { id: params.id },
    });
    if (!news) return NextResponse.json({ error: 'Noticia no encontrada' }, { status: 404 });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener noticia' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const data = await request.json();
    const slug = data.title ? slugify(data.title) : undefined;

    const news = await prisma.news.update({
      where: { id: params.id },
      data: {
        ...data,
        slug: slug || undefined,
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar noticia' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    await prisma.news.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar noticia' }, { status: 500 });
  }
}
