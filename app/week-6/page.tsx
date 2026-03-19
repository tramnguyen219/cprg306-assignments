"use client";

import { useState } from "react";
import itemsData from "./item.json"; 
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "../week-7/meal-ideas"; // 1. Import the new MealIdeas component
import { ItemType } from "../../utils/data"; // Import the ItemType from the utils

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData);
  // 2. Add new state variable for selected item name
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  const handleAddItem = (newItem: ItemType) => {
    setItems((prev) => [...prev, newItem]);
  };

  // 3. Create new event handler for item selection
  const handleItemSelect = (item: ItemType) => {
    // Clean up the item name:
    const cleanedName = item.name
      .split(',')[0] // Remove anything after a comma (like "Banana, organic")
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '') // Remove emojis
      .trim();
    
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="min-h-screen text-black bg-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-center">
          Shopping List
        </h1>
        
     
        <div className="flex gap-8">
        
          <div className="w-1/2">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} // Pass the handler to ItemList
            />
          </div>
          
          {/* Right column - Meal ideas */}
          <div className="w-1/2">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}