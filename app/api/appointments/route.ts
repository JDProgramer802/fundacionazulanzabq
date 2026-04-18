import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { datetime: 'asc' },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener citas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.client_name || !data.client_email || !data.datetime) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        client_name: data.client_name,
        client_email: data.client_email,
        client_phone: data.client_phone,
        datetime: new Date(data.datetime),
        reason: data.reason,
        status: 'pendiente',
      },
    });

    // TODO: Send email confirmation via Resend

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error('Appointment error:', error);
    return NextResponse.json({ error: 'Error al agendar la cita' }, { status: 500 });
  }
}
