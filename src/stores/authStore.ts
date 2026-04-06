import { create } from 'zustand';

type Role = 'candidato' | 'empresa' | 'admin';

interface AuthUser {
  id: string;
  email: string;
  nombre: string;
  apellidos: string;
  role: Role;
  avatarUrl?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  clearUser: () => set({ user: null }),
}));
