'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  response?: string;
  createdAt: Timestamp | null;
  status: 'pending' | 'responded';
}

interface Testimony {
  id: string;
  name: string;
  message: string;
  createdAt: Timestamp | null;
  approved: boolean;
}

interface OrderItem {
  productName: string;
  quantity: number;
}

interface Order {
  id: string;
  name: string;
  address: string;
  phone: string;
  items: OrderItem[];
  total: number;
  note?: string;
  createdAt: Timestamp | null;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

// --- helpers to safely normalize Firestore raw data ---
function normalizeContact(raw: unknown): Omit<Contact, 'id'> {
  const data = raw as Record<string, unknown>;
  return {
    name: typeof data.name === 'string' ? data.name : 'Unknown',
    email: typeof data.email === 'string' ? data.email : '',
    phone: typeof data.phone === 'string' ? data.phone : '',
    message: typeof data.message === 'string' ? data.message : '',
    response: typeof data.response === 'string' ? data.response : undefined,
    createdAt: data.createdAt && data.createdAt instanceof Object ? data.createdAt as Timestamp : null,
    status: data.status === 'responded' ? 'responded' : 'pending',
  };
}

function normalizeTestimony(raw: unknown): Omit<Testimony, 'id'> {
  const data = raw as Record<string, unknown>;
  return {
    name: typeof data.name === 'string' ? data.name : 'Anonymous',
    message: typeof data.message === 'string' ? data.message : '',
    createdAt: data.createdAt && data.createdAt instanceof Object ? data.createdAt as Timestamp : null,
    approved: Boolean(data.approved),
  };
}

function normalizeOrder(raw: unknown): Omit<Order, 'id'> {
  const data = raw as Record<string, unknown>;
  const items = Array.isArray(data.items) ? data.items : [];
  
  return {
    name: typeof data.name === 'string' ? data.name : 'Unknown',
    address: typeof data.address === 'string' ? data.address : '',
    phone: typeof data.phone === 'string' ? data.phone : '',
    items: items.map((item: unknown) => {
      const itemData = item as Record<string, unknown>;
      return {
        productName: typeof itemData?.productName === 'string' ? itemData.productName : 'Item',
        quantity: typeof itemData?.quantity === 'number' ? itemData.quantity : 1,
      };
    }),
    total: typeof data.total === 'number' ? data.total : 0,
    note: typeof data.note === 'string' ? data.note : undefined,
    createdAt: data.createdAt && data.createdAt instanceof Object ? data.createdAt as Timestamp : null,
    status:
      data.status === 'processing' || data.status === 'completed' || data.status === 'cancelled'
        ? data.status as Order['status']
        : 'pending',
  };
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'testimonies' | 'orders'>('contacts');
  const [loading, setLoading] = useState({
    contacts: true,
    testimonies: true,
    orders: true
  });

  // Testimony form state
  const [newTestimonyName, setNewTestimonyName] = useState('');
  const [newTestimonyMessage, setNewTestimonyMessage] = useState('');

  // Filter states
  const [contactFilter, setContactFilter] = useState<'all' | 'pending' | 'responded'>('all');
  const [testimonyFilter, setTestimonyFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    const contactsQuery = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubContacts = onSnapshot(contactsQuery, (snapshot) => {
      const data: Contact[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...normalizeContact(docSnap.data()),
      }));
      setContacts(data);
      setLoading((prev) => ({ ...prev, contacts: false }));
    });

    const testimoniesQuery = query(collection(db, 'testimonies'), orderBy('createdAt', 'desc'));
    const unsubTestimonies = onSnapshot(testimoniesQuery, (snapshot) => {
      const data: Testimony[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...normalizeTestimony(docSnap.data()),
      }));
      setTestimonies(data);
      setLoading((prev) => ({ ...prev, testimonies: false }));
    });

    const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubOrders = onSnapshot(ordersQuery, (snapshot) => {
      const data: Order[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...normalizeOrder(docSnap.data()),
      }));
      setOrders(data);
      setLoading((prev) => ({ ...prev, orders: false }));
    });

    return () => {
      unsubContacts();
      unsubTestimonies();
      unsubOrders();
    };
  }, []);

  // Filtered views
  const filteredContacts = contacts.filter((contact) => contactFilter === 'all' || contact.status === contactFilter);

  const filteredTestimonies = testimonies.filter((testimony) =>
    testimonyFilter === 'all' || (testimonyFilter === 'approved' ? testimony.approved : !testimony.approved)
  );

  const filteredOrders = orders.filter((order) => orderFilter === 'all' || order.status === orderFilter);

  // Update functions
  const updateTestimony = async (id: string, updates: Partial<Testimony>) => {
    try {
      await updateDoc(doc(db, 'testimonies', id), updates);
    } catch (e) {
      console.error('Failed to update testimony', e);
    }
  };

  const respondToContact = async (id: string, response: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), {
        response,
        status: 'responded'
      });
    } catch (e) {
      console.error('Failed to respond to contact', e);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status });
    } catch (e) {
      console.error('Failed to update order status', e);
    }
  };

  const deleteTestimony = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimony?')) {
      try {
        await deleteDoc(doc(db, 'testimonies', id));
      } catch (e) {
        console.error('Failed to delete testimony', e);
      }
    }
  };

  const submitTestimony = async () => {
    if (!newTestimonyName || !newTestimonyMessage) {
      alert('Please fill in both name and message fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'testimonies'), {
        name: newTestimonyName,
        message: newTestimonyMessage,
        createdAt: serverTimestamp(),
        approved: false
      });
      setNewTestimonyName('');
      setNewTestimonyMessage('');
    } catch (error) {
      console.error('Error adding testimony:', error);
      alert('Failed to add testimony. Please try again.');
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'contacts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts ({contacts.length})
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'testimonies' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('testimonies')}
        >
          Testimonies ({testimonies.length})
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders ({orders.length})
        </button>
      </div>

      {/* Contacts Section */}
      {activeTab === 'contacts' && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">📬 Contact Messages</h2>
            <div className="flex space-x-2">
              <select
                value={contactFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setContactFilter(e.target.value as typeof contactFilter)}
                className="p-2 border rounded"
              >
                <option value="all">All Messages</option>
                <option value="pending">Pending</option>
                <option value="responded">Responded</option>
              </select>
            </div>
          </div>

          {loading.contacts ? (
            <div className="text-center py-8">Loading contacts...</div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No contact messages found</div>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className={`p-4 rounded-lg shadow ${contact.status === 'pending' ? 'bg-yellow-50' : 'bg-white'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.email} | {contact.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">Received: {formatDate(contact.createdAt)}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${contact.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {contact.status}
                    </span>
                  </div>

                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="whitespace-pre-line">{contact.message}</p>
                  </div>

                  {contact.response && (
                    <div className="mt-3 p-3 bg-blue-50 rounded">
                      <p className="font-medium text-blue-800">Your Response:</p>
                      <p className="whitespace-pre-line">{contact.response}</p>
                    </div>
                  )}

                  <textarea
                    placeholder={contact.response ? 'Update your response...' : 'Write your response...'}
                    defaultValue={contact.response || ''}
                    onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => respondToContact(contact.id, e.target.value)}
                    className="w-full mt-3 p-2 border rounded"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Testimonies Section */}
      {activeTab === 'testimonies' && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">💬 Customer Testimonies</h2>
            <div className="flex space-x-2">
              <select
                value={testimonyFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTestimonyFilter(e.target.value as typeof testimonyFilter)}
                className="p-2 border rounded"
              >
                <option value="all">All Testimonies</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending Approval</option>
              </select>
            </div>
          </div>

          {/* Add Testimony Form */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3 text-lg">➕ Add New Testimony</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  value={newTestimonyName}
                  onChange={(e) => setNewTestimonyName(e.target.value)}
                  placeholder="Customer name"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newTestimonyMessage}
                  onChange={(e) => setNewTestimonyMessage(e.target.value)}
                  placeholder="Testimony message"
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
            </div>
            <button
              onClick={submitTestimony}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Add Testimony
            </button>
          </div>

          {loading.testimonies ? (
            <div className="text-center py-8">Loading testimonies...</div>
          ) : filteredTestimonies.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No testimonies found</div>
          ) : (
            <div className="grid gap-4">
              {filteredTestimonies.map((testimony) => (
                <div key={testimony.id} className={`p-4 rounded-lg shadow ${testimony.approved ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{testimony.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateTestimony(testimony.id, { approved: !testimony.approved })}
                        className={`px-2 py-1 text-xs rounded ${testimony.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {testimony.approved ? 'Approved' : 'Pending'}
                      </button>
                      <button
                        onClick={() => deleteTestimony(testimony.id)}
                        className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Posted: {formatDate(testimony.createdAt)}</p>
                  <textarea
                    defaultValue={testimony.message}
                    onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => updateTestimony(testimony.id, { message: e.target.value })}
                    className="w-full mt-2 p-2 border rounded"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Orders Section */}
      {activeTab === 'orders' && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">🛒 Customer Orders</h2>
            <div className="flex space-x-2">
              <select
                value={orderFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOrderFilter(e.target.value as typeof orderFilter)}
                className="p-2 border rounded"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {loading.orders ? (
            <div className="text-center py-8">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No orders found</div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className={`p-4 rounded-lg shadow ${
                    order.status === 'completed'
                      ? 'bg-green-50'
                      : order.status === 'cancelled'
                      ? 'bg-red-50'
                      : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{order.name}</h3>
                      <h6 className="font-bold">{order.address}</h6>
                      <p className="text-sm text-gray-600">{order.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">Ordered: {formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-2 py-1 text-xs rounded-full mb-2 ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </span>
                      <p className="font-bold">KES {order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  {order.note && (
                    <div className="mt-2 p-2 bg-gray-100 rounded">
                      <p className="text-sm">
                        <span className="font-medium">Customer Note:</span> {order.note}
                      </p>
                    </div>
                  )}

                  <div className="mt-3">
                    <h4 className="font-medium mb-1">Order Items:</h4>
                    <ul className="space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.productName}</span>
                          <span className="font-medium">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <select
                      value={order.status}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateOrderStatus(order.id, e.target.value as Order['status'])
                      }
                      className="p-2 border rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}