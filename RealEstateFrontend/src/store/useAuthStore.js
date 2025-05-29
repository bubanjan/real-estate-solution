import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  role: null,
  username: null,

  setAuth: ({ isLoggedIn, role, username }) =>
    set({ isLoggedIn, role, username }),

  logout: () => set({ isLoggedIn: false, role: null, username: null }),
}));
