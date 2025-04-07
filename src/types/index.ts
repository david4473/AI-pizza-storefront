export interface CartItem extends Pizza {
  quantity: number;
}

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isNew?: boolean;
  ingredients?: string[];
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Pizza) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => void;
}

export interface PizzaCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isNew?: boolean;
  ingredients?: string[];
  onAddToCart?: (id: string) => void;
}

export interface item {
  id: string;
  quantity: number;
}
