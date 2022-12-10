import create from 'zustand';

export interface ToastState {
  toastData: any;
  showToast: (toastConfig: any) => void;
}

const useToastStore = create((set) => ({
  toastData: null,
  showToast: (toastConfig: any) => {
    set((state: any) => ({
      ...state,
      toastData: toastConfig,
    }));
  },
}));

export default useToastStore;
