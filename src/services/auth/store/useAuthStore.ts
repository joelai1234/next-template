import create from 'zustand';

interface AuthState {
  authenticatedCoreBackendApi: boolean;
  setAuthenticatedCoreBackendApi: (
    authenticatedCoreBackendApi: boolean
  ) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authenticatedCoreBackendApi: false,
  setAuthenticatedCoreBackendApi: (authenticatedCoreBackendApi: boolean) =>
    set(() => ({ authenticatedCoreBackendApi })),
}));
