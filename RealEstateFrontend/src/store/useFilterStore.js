import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  searchTerm: '',
  city: '',
  estateType: '',
  minPrice: '',
  maxPrice: '',
  minSize: '',
  maxSize: '',
  orderBy: '',

  setSearchTerm: (v) => set({ searchTerm: v }),
  setCity: (v) => set({ city: v }),
  setEstateType: (v) => set({ estateType: v }),
  setMinPrice: (v) => set({ minPrice: v }),
  setMaxPrice: (v) => set({ maxPrice: v }),
  setMinSize: (v) => set({ minSize: v }),
  setMaxSize: (v) => set({ maxSize: v }),
  setOrderBy: (v) => set({ orderBy: v }),
}));
