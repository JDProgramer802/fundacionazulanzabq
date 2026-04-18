import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const faq = await prisma.fAQ.create({
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order || 0,
        active: body.active ?? true,
      },
    });
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear FAQ' }, { status: 500 });
  }
}
