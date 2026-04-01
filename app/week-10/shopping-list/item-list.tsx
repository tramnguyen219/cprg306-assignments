"use client";

import { useState } from "react";
import Item from "./item";
import { ItemType } from "../../utils/data"; // Import the ItemType from the utils


type ItemListProps = {
  items: ItemType[];
  onItemSelect: (item: ItemType) => void;
};
type SortBy = "name" | "category" | "grouped";
export default function ItemList({ items, onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState("name");

  // Sort items for name or category views
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Group items by category for grouped view
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ItemType[]>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedItems).sort();

  // Sort items in each category alphabetically
  sortedCategories.forEach(category => {
    groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <span className="text-red-700 self-center font-bold">Sort by:</span>
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded-md transition-colors ${
            sortBy === "name"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Name Items
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded-md transition-colors ${
            sortBy === "category"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Category Items
        </button>
        <button
          onClick={() => setSortBy("grouped")}
          className={`px-4 py-2 rounded-md transition-colors ${
            sortBy === "grouped"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Grouped Category
        </button>
      </div>

      {sortBy === "grouped" ? (
        <div className="space-y-6">
          {sortedCategories.map((category) => (
            <div key={category}>
              <h2 className="text-xl font-semibold text-gray-800 capitalize mb-3">
                {category}
              </h2>
              <ul className="space-y-2">
                {groupedItems[category].map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                    onSelect={() => onItemSelect(item)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}