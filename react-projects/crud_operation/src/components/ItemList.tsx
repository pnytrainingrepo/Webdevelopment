// components/ItemList.tsx
'use client'

import { useEffect, useState } from "react";
import { Item } from "@/interfaces/Item";

function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [editItem, setEditItem] = useState<Item | null>(null);

  const fetchItems = async () => {
    const response = await fetch("/api/items");
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    // Check if name and price are provided and not empty
    if (!name.trim() || !description.trim() || !price || isNaN(Number(price))) {
      alert("Please provide a valid name, description and price.");
      return; // Stop the function execution
    }
  
    // Convert price to a number to avoid string issues
    const priceValue = Number(price);
  
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: priceValue }),
      });
  
      if (!response.ok) {
        // Handle server error
        alert("Failed to add item. Please try again.");
        return;
      }
  
      const newItem = await response.json();
      setItems([...items, newItem]);
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      // Handle network or other errors
      console.error("Error adding item:", error);
      alert("An error occurred while adding the item.");
    }
  };
  

  const updateItem = async () => {
    if (!editItem) return;

    const response = await fetch(`/api/items/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price }),
    });
    const updatedItem = await response.json();
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    setName("");
    setDescription("");
    setPrice("");
    setEditItem(null);
  };

  const deleteItem = async (id: number) => {
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (item: Item) => {
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setEditItem(item);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Items List</h1>
      <ul>
	 {items.length > 0 ? (
        	items.map((item) => (
          	<li key={item.id} className="border-b py-2 flex justify-between items-center">
            	<span>
              	{item.name} :: {item.description} == Rs:{item.price}
            	</span>
            	<div>
              	<button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
              	<button onClick={() => deleteItem(item.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
            	</div>
          </li>
        	))
	  ) : (
 
		 <li>No items found.</li>

	  )}

	</ul>
      <div className="mt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Item Description"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 mr-2"
        />
        {editItem ? (
          <button onClick={updateItem} className="bg-blue-500 text-white px-4 py-2">Update Item</button>
        ) : (
          <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2">Add Item</button>
        )}
      </div>
    </div>
  );
}

export default ItemList;
