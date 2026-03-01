import { create } from "zustand";

// Simple UI store to manage global modal state (single rating popup)
export const useUiStore = create((set) => ({
  ratingPopup: { open: false, carwashId: null },
  openRatingPopup: (carwashId = null) =>
    set({ ratingPopup: { open: true, carwashId } }),
  closeRatingPopup: () => set({ ratingPopup: { open: false, carwashId: null } }),
}));
