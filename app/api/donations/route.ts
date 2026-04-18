import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const donations = await prisma.donation.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(donations);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener donaciones' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.donor_name || !data.donor_email || !data.amount) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const donation = await prisma.donation.create({
      data: {
        donor_name: data.donor_name,
        donor_email: data.donor_email,
        amount: parseFloat(data.amount),
        receipt_image: data.receipt_image,
        status: 'pendiente_verificacion',
      },
    });

    // TODO: Send thank you email via Resend

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error('Donation error:', error);
    return NextResponse.json({ error: 'Error al reportar donación' }, { status: 500 });
  }
}
