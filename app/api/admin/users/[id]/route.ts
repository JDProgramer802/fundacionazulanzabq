import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// DELETE /api/admin/users/[id] - Delete a user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'ID de usuario requerido' }, { status: 400 });
    }

    // Optional: Check if the user is not trying to delete themselves
    // (This would require getting the current user ID from the token)
    // For now, simple delete

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
