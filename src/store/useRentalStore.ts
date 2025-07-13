import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 用户状态接口
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

// 产品状态接口
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  available: boolean;
  rating: number;
  reviews: number;
}

// 购物车项目接口
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  rentalDays: number;
}

// 应用状态接口
interface AppState {
  // UI 状态
  isLoading: boolean;
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  
  // 用户状态
  user: User | null;
  isAuthenticated: boolean;
  
  // 产品状态
  products: Product[];
  featuredProducts: Product[];
  searchQuery: string;
  selectedCategory: string;
  
  // 购物车状态
  cart: CartItem[];
  cartTotal: number;
  
  // 操作函数
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  
  // 用户操作
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  
  // 产品操作
  setProducts: (products: Product[]) => void;
  setFeaturedProducts: (products: Product[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  
  // 购物车操作
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateCartTotal: () => void;
}

// 创建 Zustand store
export const useAppStore = create<AppState>()()
  (devtools(
    immer((set, get) => ({
      // 初始状态
      isLoading: false,
      isSidebarOpen: false,
      theme: 'light',
      
      user: null,
      isAuthenticated: false,
      
      products: [],
      featuredProducts: [],
      searchQuery: '',
      selectedCategory: 'all',
      
      cart: [],
      cartTotal: 0,
      
      // UI 操作
      setLoading: (loading) => set((state) => {
        state.isLoading = loading;
      }),
      
      toggleSidebar: () => set((state) => {
        state.isSidebarOpen = !state.isSidebarOpen;
      }),
      
      setTheme: (theme) => set((state) => {
        state.theme = theme;
      }),
      
      // 用户操作
      setUser: (user) => set((state) => {
        state.user = user;
        state.isAuthenticated = !!user;
      }),
      
      login: (user) => set((state) => {
        state.user = user;
        state.isAuthenticated = true;
      }),
      
      logout: () => set((state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.cart = [];
        state.cartTotal = 0;
      }),
      
      // 产品操作
      setProducts: (products) => set((state) => {
        state.products = products;
      }),
      
      setFeaturedProducts: (products) => set((state) => {
        state.featuredProducts = products;
      }),
      
      setSearchQuery: (query) => set((state) => {
        state.searchQuery = query;
      }),
      
      setSelectedCategory: (category) => set((state) => {
        state.selectedCategory = category;
      }),
      
      // 购物车操作
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => 
          cartItem.productId === item.productId
        );
        
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.cart.push({
            ...item,
            id: `cart-${Date.now()}-${Math.random()}`
          });
        }
        
        // 重新计算总价
        get().calculateCartTotal();
      }),
      
      removeFromCart: (itemId) => set((state) => {
        state.cart = state.cart.filter(item => item.id !== itemId);
        get().calculateCartTotal();
      }),
      
      updateCartItemQuantity: (itemId, quantity) => set((state) => {
        const item = state.cart.find(cartItem => cartItem.id === itemId);
        if (item) {
          if (quantity <= 0) {
            state.cart = state.cart.filter(cartItem => cartItem.id !== itemId);
          } else {
            item.quantity = quantity;
          }
        }
        get().calculateCartTotal();
      }),
      
      clearCart: () => set((state) => {
        state.cart = [];
        state.cartTotal = 0;
      }),
      
      calculateCartTotal: () => set((state) => {
        state.cartTotal = state.cart.reduce(
          (total, item) => total + (item.price * item.quantity * item.rentalDays),
          0
        );
      })
    })),
    {
      name: 'app-store',
      version: 1
    }
  ));

// 导出类型
export type { User, Product, CartItem, AppState };
