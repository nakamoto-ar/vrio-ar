import { create } from 'zustand';

type Section = 'HOME' | 'PROCESS' | 'CREATIVE' | 'STRATEGY' | 'SYSTEMS';

interface NavigationState {
    activeSection: Section;
    setActiveSection: (section: Section) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
    activeSection: 'HOME',
    setActiveSection: (section) => set({ activeSection: section }),
}));
