import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  role: null,
  username: null,
  userId: null,

  setAuth: ({ isLoggedIn, role, username, userId }) =>
    set({ isLoggedIn, role, username, userId }),

  logout: () =>
    set({ isLoggedIn: false, role: null, username: null, userId: null }),
}));
