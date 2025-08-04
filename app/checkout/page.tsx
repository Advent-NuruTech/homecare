'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};


export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    // Add unique IDs to each cart item if they don't exist
    const cartWithIds = storedCart.map((item) => ({
      ...item,
      id: item.id || Math.random().toString(36).substring(2, 9)
    }));
    setCart(cartWithIds);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return alert('Please fill all required fields');
    if (cart.length === 0) return alert('Your cart is empty');

    try {
      await addDoc(collection(db, 'orders'), {
        name: form.name,
        phone: form.phone,
        address: form.address,
        note: form.note,
        items: cart.map(item => ({
          productName: item.name,
          price: item.price,
          quantity: item.qty
        })),
        total,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      localStorage.removeItem('cart');
      alert('Order submitted successfully! Please pay via M-Pesa to complete.');
      router.push('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Order Summary at the Top */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="border rounded-lg divide-y">
              {cart.map((item) => (
                <div key={item.id} className="p-3 flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center mt-1">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-6 h-6 flex items-center justify-center border rounded bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.qty}</span>
                      <button 
                        onClick={() => increaseQuantity(item.id)}
                        className="w-6 h-6 flex items-center justify-center border rounded bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-4">Ksh {(item.price * item.qty).toLocaleString()}</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between p-3 bg-gray-50 font-bold">
                <span>Total</span>
                <span>Ksh {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Name*</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Delivery Address*</label>
              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Order Notes (Optional)</label>
              <textarea
                name="note"
                placeholder="special instructions?"
                value={form.note}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div className="bg-gray-100 p-4 rounded shadow">
              <p className="font-semibold">Total: Ksh {total.toLocaleString()}</p>
              <p className="text-sm mt-2 text-gray-700">
                After submitting this form, please pay using the following details:
              </p>
              <ul className="text-sm text-gray-800 mt-1 space-y-1">
                <li><strong>M-Pesa Number:</strong> 0102930605 </li>
                <li><strong>Paybill:</strong> 400200</li>
                <li><strong>Account:</strong> 1051914</li>
                <li><strong>Business Namee:</strong> EDEN LIFE HOME CARE</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 font-medium"
            >
              Submit Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}