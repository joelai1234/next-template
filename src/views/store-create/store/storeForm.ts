import type { StateCreator } from 'zustand';
import create from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

interface StoreFormState {
  id: string;
  storeName: string;
  setStoreName: (name: string) => void;
  setStoreId: (id: string) => void;
}

type StoreFormPersist = (
  config: StateCreator<StoreFormState>,
  options: PersistOptions<StoreFormState>
) => StateCreator<StoreFormState>;

export const useStoreFormStore = create<StoreFormState>(
  (persist as StoreFormPersist)(
    (set) => ({
      id: '',
      storeName: '',
      setStoreName: (name) => set(() => ({ storeName: name })),
      setStoreId: (id) => set(() => ({ id })),
    }),
    {
      name: 'storeForm',
    }
  )
);
