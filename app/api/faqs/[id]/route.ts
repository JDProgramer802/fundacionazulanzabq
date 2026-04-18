import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const faq = await prisma.fAQ.update({
      where: { id: params.id },
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order,
        active: body.active,
      },
    });
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar FAQ' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.fAQ.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar FAQ' }, { status: 500 });
  }
}
