'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import {
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
  query,
  orderBy
} from 'firebase/firestore';

type Contact = {
  name: string;
  email: string;
  message: string;
};

type Order = {
  name: string;
  phone: string;
  items: { name: string; price: number }[];
  total: number;
  date: Timestamp;
};

interface ContactData {
  name: string;
  email: string;
  message: string;
  timestamp: Timestamp;
}

interface OrderData {
  name: string;
  phone: string;
  items: { name: string; price: number }[];
  total: number;
  date: Timestamp;
}

type Testimony = {
  name: string;
  testimony: string;
};

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [testimony, setTestimony] = useState<Testimony>({
    name: '',
    testimony: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubContacts = onSnapshot(
      query(collection(db, 'contacts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as ContactData);
        setContacts(data);
      }
    );

    const unsubOrders = onSnapshot(
      query(collection(db, 'orders'), orderBy('date', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as OrderData);
        setOrders(data);
      }
    );

    return () => {
      unsubContacts();
      unsubOrders();
    };
  }, []);

  const handleSubmit = async () => {
    if (!testimony.name || !testimony.testimony) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'testimonies'), {
        ...testimony,
        timestamp: Timestamp.now()
      });
      setTestimony({ name: '', testimony: '' });
    } catch (error) {
      console.error('Error submitting testimony:', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">🌿 Admin Dashboard – EdenLife</h1>

      {/* Submit Testimony */}
      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">➕ Add Testimony</h2>
        <input
          type="text"
          placeholder="Name"
          className="input mb-2 w-full"
          value={testimony.name}
          onChange={(e) => setTestimony({ ...testimony, name: e.target.value })}
        />
        <textarea
          placeholder="Testimony"
          className="textarea w-full mb-2"
          rows={3}
          value={testimony.testimony}
          onChange={(e) =>
            setTestimony({ ...testimony, testimony: e.target.value })
          }
        ></textarea>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Testimony'}
        </button>
      </section>

      {/* Real-Time Contacts */}
      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">📬 Contacts</h2>
        <ul className="space-y-2">
          {contacts.map((c, i) => (
            <li key={i} className="border-b pb-2">
              <p><strong>Name:</strong> {c.name}</p>
              <p><strong>Email:</strong> {c.email}</p>
              <p className="italic">{c.message}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Real-Time Orders */}
      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">🧾 Orders</h2>
        <ul className="space-y-4">
          {orders.map((o, i) => (
            <li key={i} className="border-b pb-2">
              <p><strong>Name:</strong> {o.name}</p>
              <p><strong>Phone:</strong> {o.phone}</p>
              <p><strong>Total:</strong> Ksh {o.total}</p>
              <ul className="list-disc pl-5 mt-1">
                {o.items.map((item, idx) => (
                  <li key={idx}>{item.name} - Ksh {item.price}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
