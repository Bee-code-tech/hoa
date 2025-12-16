'use client'

import { useCartStore } from '@/app/store/cart-store'

export default function TestPage() {
  const { cart, cartCount, addToCart, removeFromCart, clearCart } = useCartStore()

  const testItem = {
    id: 1,
    title: "Test Course",
    price: 99.99
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Zustand Cart Test</h1>
      
      <div className="mb-4">
        <p>Cart Items: {cartCount()}</p>
        <p>Cart Length: {cart.length}</p>
      </div>
      
      <div className="space-x-2 mb-4">
        <button 
          onClick={() => addToCart(testItem)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Item
        </button>
        
        <button 
          onClick={() => removeFromCart(1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Remove Item
        </button>
        
        <button 
          onClick={clearCart}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Cart Contents:</h2>
        {cart.map(item => (
          <div key={item.id} className="border p-2 mb-2">
            <p>ID: {item.id}</p>
            <p>Title: {item.title}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}