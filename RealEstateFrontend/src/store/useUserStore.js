import { create } from 'zustand';
import { fetchUsers, createUser, deleteUser } from '../api/realEstateApi';

export const useUserStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    const users = await fetchUsers();
    set({ users });
  },
  addUser: async (user) => {
    await createUser(user);
    const users = await fetchUsers();
    set({ users });
  },
  removeUser: async (id) => {
    await deleteUser(id);
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
  },
}));
