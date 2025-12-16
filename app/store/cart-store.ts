import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
}

type CartStore = {
  cart: CartItem[]
  isCartOpen: boolean
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  cartTotal: () => number
  cartCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
          if (existingItem) {
            return {
              cart: state.cart.map(cartItem =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
            }
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }]
            }
          }
        })
        // Ensure the cart opens after adding an item
        setTimeout(() => {
          set({ isCartOpen: true })
        }, 0)
      },
      
      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter(item => item.id !== id)
        }))
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
          return
        }
        
        set((state) => ({
          cart: state.cart.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },
      
      clearCart: () => {
        set({ cart: [] })
      },
      
      openCart: () => {
        set({ isCartOpen: true })
      },
      
      closeCart: () => {
        set({ isCartOpen: false })
      },
      
      toggleCart: () => {
        set((state) => ({ isCartOpen: !state.isCartOpen }))
      },
      
      cartTotal: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      
      cartCount: () => {
        const { cart } = get()
        return cart.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        cart: state.cart,
        isCartOpen: state.isCartOpen
      })
    }
  )
)