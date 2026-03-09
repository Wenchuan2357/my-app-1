import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { todos } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { completed } = await request.json();

    const [updatedTodo] = await db
      .update(todos)
      .set({ completed })
      .where(eq(todos.id, parseInt(id)))
      .returning();

    if (!updatedTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [deletedTodo] = await db
      .delete(todos)
      .where(eq(todos.id, parseInt(id)))
      .returning();

    if (!deletedTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
