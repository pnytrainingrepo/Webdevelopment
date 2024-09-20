// components/ItemList.tsx
'use client'
import { useEffect, useState } from 'react';

function ItemList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch('/api/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const addItem = async () => {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });
    const newItem = await response.json();
    setItems([...items, newItem]);
    setName('');
    setPrice('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Items List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border-b py-2">
            {item.name} :: ${item.price}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 mr-2"
        />
        <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2">
          Add Item
        </button>
      </div>
    </div>
  );
}

export default ItemList;
