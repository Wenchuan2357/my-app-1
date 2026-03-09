import { db } from './db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

// 示例：插入用户
export async function createUser(name: string, email: string) {
  const result = await db.insert(users)
    .values({ name, email })
    .returning();
  return result[0];
}

// 示例：获取所有用户
export async function getAllUsers() {
  return await db.select().from(users);
}

// 示例：根据 ID 获取用户
export async function getUserById(id: number) {
  const result = await db.select().from(users)
    .where(eq(users.id, id));
  return result[0];
}

// 示例：更新用户
export async function updateUser(id: number, data: { name?: string; email?: string }) {
  const result = await db.update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return result[0];
}

// 示例：删除用户
export async function deleteUser(id: number) {
  const result = await db.delete(users)
    .where(eq(users.id, id))
    .returning();
  return result[0];
}
