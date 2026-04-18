import { ContactNotificationEmail } from '@/components/emails/ContactNotificationEmail';
import { getAuthUser } from '@/lib/auth';
import { sendMail } from '@/lib/mail-service';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener mensajes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    // Enviar notificación al admin usando el servicio centralizado
    await sendMail({
      to: process.env.ADMIN_EMAIL || 'fundacionazulanza@gmail.com',
      subject: `Nuevo mensaje de: ${data.name}`,
      react: ContactNotificationEmail({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    });

    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 });
  }
}
