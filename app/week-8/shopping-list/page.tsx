"use client";

import { useState } from "react";
import itemsData from "./item.json"; 
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas"; // 1. Import 
import { ItemType } from '@/utils/data'; // Import the ItemType from the types

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: ItemType) => {
    setItems((prev) => [...prev, newItem]);


  }
  // function handleAddItem(item: any) {
  //   const newItem: ItemType = {
  //     id: crypto.randomUUID(),
  //     ...item,
  //   };
  //   setItems((prev) => [...prev, newItem]);
  // }

  // NEW: when user clicks an item in the list
  function handleItemSelect(item: ItemType) {
    // Clean the item name for the API:
    // 1) take the part before the comma (removes " , 1 kg")
    // 2) trim spaces
    // 3) remove emojis (basic regex)
    const cleaned = item.name
      .split(",")[0]
      .trim()
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\u2011-\u26FF|\uD83E[\uDD00-\uDDFF])/g,
        ""
      )
      .trim()
      .toLowerCase();

    setSelectedItemName(cleaned);

    console.log ("Selected item:", item.name, "Cleaned name for API:", cleaned);
  }
  



  return (
    <main className="min-h-screen text-black bg-slate-200 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-center">
          Shopping List
        </h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={(item) => handleItemSelect(item)} />
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}