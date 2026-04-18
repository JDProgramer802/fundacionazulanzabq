import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

// GET /api/admin/users - List all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error listing users:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// POST /api/admin/users - Create/Invite new user
export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password_hash,
        role: role || 'admin',
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
