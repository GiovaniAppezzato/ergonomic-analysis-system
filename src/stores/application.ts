import { create } from "zustand";

interface ApplicationState {
    isLoadingApp: boolean;
    updateIsLoadingApp: (isLoadingApp: boolean) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
    isLoadingApp: true,
    updateIsLoadingApp: (isLoadingApp: boolean) => set({ isLoadingApp }),
}));
