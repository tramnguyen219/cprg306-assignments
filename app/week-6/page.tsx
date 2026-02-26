"use client";

import { useState } from "react";
import itemsData from "./item.json"; 
import NewItem from "./new-item";
import ItemList from "./item-list";
import Item from './item';


type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData);

  const handleAddItem = (newItem: ItemType) => {
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <main className="min-h-screen text-black bg-slate-200 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-center">
          Shopping List
        </h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}