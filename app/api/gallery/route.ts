import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('Gallery API Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    // Si es un error de conexión, devolvemos un mensaje descriptivo pero seguro
    if (error.message.includes("Can't reach database server")) {
      return NextResponse.json(
        {
          error: 'El servidor de base de datos no responde. Por favor, reintenta en unos momentos.',
          type: 'DB_CONNECTION_ERROR',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: 'Error interno al obtener la galería',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
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
