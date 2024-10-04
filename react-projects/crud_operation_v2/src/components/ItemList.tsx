// components/ItemList.tsx
'use client';

import { useEffect, useState } from 'react';
import { Item } from '@/interfaces/Item';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch all items from the server
  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      if (response.ok) {
        const data: Item[] = await response.json();
        setItems(data);
      } else {
        console.error('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle adding a new item
  const addItem = async () => {
    if (!name.trim() || !price || !description.trim()) {
      alert('Please provide a valid name, price, and description.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to add item.');
        setIsLoading(false);
        return;
      }

      const newItem: Item = await response.json();
      setItems([...items, newItem]);
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('An error occurred while adding the item.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle updating an existing item
  const updateItemHandler = async () => {
    if (!editItem) return;

    if (!name.trim() || !price || !description.trim()) {
      alert('Please provide a valid name, price, and description.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`/api/items/${editItem.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update item.');
        setIsLoading(false);
        return;
      }

      const updatedItem: Item = await response.json();
      setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
      setEditItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('An error occurred while updating the item.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting an item
  const deleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete item.');
        return;
      }

      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('An error occurred while deleting the item.');
    }
  };

  // Handle editing an item
  const handleEdit = (item: Item) => {
    setEditItem(item);
    setName(item.name);
    setPrice(item.price.toString());
    setDescription(item.description || '');
    // Note: Image handling during edit is optional
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditItem(null);
    setName('');
    setPrice('');
    setDescription('');
    setImage(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Items List</h1>
      <ul>
        {items.length > 0 ? (
          items.map(item => (
            <li key={item.id} className="border-b py-2 flex justify-between items-center">
              <div className="flex items-center">
                {item.image_path && (
                  <img
                    src={item.image_path}
                    alt={item.name}
                    className="w-12 h-12 object-cover mr-4 rounded"
                  />
                )}
                <div>
                  <span className="font-semibold">{item.name}</span> - ${item.price}
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No items found.</li>
        )}
      </ul>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">
          {editItem ? 'Edit Item' : 'Add New Item'}
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Item Name"
            className="border p-2 mr-2 mb-2 md:mb-0 flex-1"
          />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Price"
            className="border p-2 mr-2 mb-2 md:mb-0 w-32"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 mr-2 mb-2 md:mb-0 flex-1"
            rows={2}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
            className="border p-2 mr-2 mb-2 md:mb-0"
          />
          {editItem ? (
            <div className="flex">
              <button
                onClick={updateItemHandler}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Item'}
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={addItem}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Item'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
