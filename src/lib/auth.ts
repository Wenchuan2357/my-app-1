export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;

  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

export function setUser(user: User): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user:', error);
  }
}

export function logout(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Failed to logout:', error);
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}
