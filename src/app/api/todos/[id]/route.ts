import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { todos } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// Helper function to get user ID from request
function getUserIdFromRequest(request: NextRequest): number | null {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return null;

    // For simplicity, we're using Basic Auth with user ID
    // In production, you would use JWT tokens
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const userId = parseInt(credentials);

    return isNaN(userId) ? null : userId;
  } catch {
    return null;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { completed } = await request.json();

    // Only update todo if it belongs to the user
    const [updatedTodo] = await db
      .update(todos)
      .set({ completed })
      .where(and(eq(todos.id, parseInt(id)), eq(todos.userId, userId)))
      .returning();

    if (!updatedTodo) {
      return NextResponse.json({ error: 'Todo not found or unauthorized' }, { status: 404 });
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
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Only delete todo if it belongs to the user
    const [deletedTodo] = await db
      .delete(todos)
      .where(and(eq(todos.id, parseInt(id)), eq(todos.userId, userId)))
      .returning();

    if (!deletedTodo) {
      return NextResponse.json({ error: 'Todo not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
