import create from 'zustand';

interface StoreFormState {
  id: string;
  storeName: string;
  setStoreName: (name: string) => void;
  setStoreId: (id: string) => void;
}

export const useStoreFormStore = create<StoreFormState>((set) => ({
  id: '',
  storeName: '',
  setStoreName: (name) => set(() => ({ storeName: name })),
  setStoreId: (id) => set(() => ({ id })),
}));
