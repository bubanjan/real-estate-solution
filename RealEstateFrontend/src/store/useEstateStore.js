import { create } from 'zustand';
import {
  fetchEstates,
  deleteEstate,
  updateEstate,
  uploadEstateImage,
} from '../api/realEstateApi';
import { useFilterStore } from './useFilterStore';

export const useEstateStore = create((set, get) => ({
  estates: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,

  setPage: (page) => set({ page }),

  fetchEstatesData: async () => {
    set({ loading: true, error: null });

    const {
      searchTerm,
      city,
      estateType,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      orderBy,
    } = useFilterStore.getState();

    try {
      const { data, pagination } = await fetchEstates({
        pageNumber: get().page,
        pageSize: 9,
        searchWord: searchTerm,
        city,
        estateCategory: estateType,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        orderBy,
      });
      set({ estates: data, totalPages: pagination.totalPages });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteEstateById: async (id) => {
    await deleteEstate(id);
    set((state) => ({
      estates: state.estates.filter((e) => e.id !== id),
    }));
  },

  updateEstateById: async (id, formData, imageFile) => {
    await updateEstate(id, formData);
    if (imageFile) {
      await uploadEstateImage(id, imageFile);
    }
    await get().fetchEstatesData();
  },
}));
