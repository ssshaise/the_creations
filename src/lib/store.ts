import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './data';

/* ─── Cart Types ─── */
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserInfo {
  phone: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
}

/* ─── Cart Store ─── */
interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (product: Product) => {
        const items = get().items;
        const existingItem = items.find(item => item.product.id === product.id);
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter(item => item.product.id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
      setCartOpen: (open: boolean) => set({ isCartOpen: open }),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    {
      name: 'the-creations-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

/* ─── Auth Store ─── */
interface AuthStore {
  isLoggedIn: boolean;
  phone: string;
  userName: string;
  isAuthModalOpen: boolean;
  isOtpSent: boolean;
  login: (phone: string, name: string) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  setOtpSent: (sent: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      phone: '',
      userName: '',
      isAuthModalOpen: false,
      isOtpSent: false,

      login: (phone: string, name: string) => {
        set({ isLoggedIn: true, phone, userName: name, isAuthModalOpen: false, isOtpSent: false });
      },

      logout: () => {
        set({ isLoggedIn: false, phone: '', userName: '', isOtpSent: false });
      },

      openAuthModal: () => set({ isAuthModalOpen: true, isOtpSent: false }),
      closeAuthModal: () => set({ isAuthModalOpen: false, isOtpSent: false }),
      setOtpSent: (sent: boolean) => set({ isOtpSent: sent }),
    }),
    {
      name: 'the-creations-auth',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        phone: state.phone,
        userName: state.userName,
      }),
    }
  )
);

/* ─── Theme Store ─── */
interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: next });
        if (typeof document !== 'undefined') {
          if (next === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
    }),
    {
      name: 'the-creations-theme-v2',
    }
  )
);

/* ─── Contact / Inquiry Store ─── */
interface InquiryStore {
  isInquiryOpen: boolean;
  inquirySubject: string;
  openInquiry: (subject?: string) => void;
  closeInquiry: () => void;
}

export const useInquiryStore = create<InquiryStore>((set) => ({
  isInquiryOpen: false,
  inquirySubject: '',
  openInquiry: (subject = 'Custom Resin Art Commission') =>
    set({ isInquiryOpen: true, inquirySubject: subject }),
  closeInquiry: () => set({ isInquiryOpen: false, inquirySubject: '' }),
}));

