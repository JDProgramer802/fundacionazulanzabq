import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener noticias' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const slug = slugify(data.title);

    const news = await prisma.news.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt,
        image_url: data.image_url,
        image_alt: data.image_alt || data.title,
        meta_title: data.meta_title || data.title,
        meta_desc: data.meta_desc || data.excerpt,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('Create news error:', error);
    return NextResponse.json({ error: 'Error al crear noticia' }, { status: 500 });
  }
}
