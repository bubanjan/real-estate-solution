import { useEstateStore } from './useEstateStore';
import { create } from 'zustand';

export const useFilterStore = create((set) => {
  const resetPage = () => useEstateStore.getState().setPage(1);

  return {
    searchTerm: '',
    city: '',
    estateType: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    orderBy: '',

    setSearchTerm: (v) => {
      resetPage();
      set({ searchTerm: v });
    },
    setCity: (v) => {
      resetPage();
      set({ city: v });
    },
    setEstateType: (v) => {
      resetPage();
      set({ estateType: v });
    },
    setMinPrice: (v) => {
      resetPage();
      set({ minPrice: v });
    },
    setMaxPrice: (v) => {
      resetPage();
      set({ maxPrice: v });
    },
    setMinSize: (v) => {
      resetPage();
      set({ minSize: v });
    },
    setMaxSize: (v) => {
      resetPage();
      set({ maxSize: v });
    },
    setOrderBy: (v) => {
      resetPage();
      set({ orderBy: v });
    },
  };
});
