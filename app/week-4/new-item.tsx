"use client";
import React, { useState } from "react";

export default function NewItem() {
  // State variables for form fields
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState<string>("produce");
  const [nameTouched, setNameTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showWarning, setShowWarning] = useState(false);

  // Form submission handler with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Advanced validation
    if (!name || name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    
    // Create item object
    const item = { name, quantity, category };
    
    // Log console
    console.log(item);
    
    // Show alert with item 
    alert(`Item Name: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);
    
    // Reset form 
    resetForm();
  };

  // Reset form to initial state
  const resetForm = () => {
    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
    setError("");
    setShowWarning(false);
  };

  // Handle name field blur event
  const handleNameBlur = () => {
    setNameTouched(true);
    if (!name) {
      setError("Name is required");
    } else if (name.length < 2) {
      setError("Name must be at least 2 characters");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-50 p-6">
      <div className="w-full max-w-md bg-gray-500 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-black-800 mb-6">
          Shopping List Web App
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
           {/* Item Name */}
          <div>
            <label
              htmlFor="itemName"
              className="block text-lg font-medium text-gray-text bold-700 mb-1"
            >
              Item Name 
            </label>

            <input
              id="itemName"
              type="text"
              value={name}
              onChange={(e) => {
               
                setName(e.target.value);
              }}
              onFocus={() => {
               
                setShowWarning(false);
              }}
              onBlur={() => {
               
                if (name.length < 2) {
                  setShowWarning(true);
                } else {
                  setShowWarning(false);
                }
              }}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                showWarning ? "border-red-500 bg-red-50 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
              }
              }`}
            />

            {showWarning && (
              <p className="mt-1 text-sm text-red-500">
                Item name must be at least 2 characters
              </p>
            )}
          </div>


          {/* Quantity Field */}
          <div>
            <label htmlFor="quantity" className="block text-lg font-medium text-gray-text bold-700 mb-1">
              Quantity 
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max="99"
              className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Category Field */}
          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-text bold-700 mb-1">
              Category 
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="frozen foods">Frozen Foods</option>
              <option value="canned goods">Canned Goods</option>
              <option value="dry goods">Dry Goods</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name || name.length < 2}
            className={`w-full py-3 px-4 rounded-lg font-small transition ${
              !name || name.length < 2
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-red-700 active:bg-red-800"
            } disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}