"use client";

import { useState, useEffect } from "react";

//fetching function to get meal ideas based on ingredient
async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || []; // Return empty array if no meals found
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw to handle in component
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if ingredient is empty
    if (!ingredient) {
      setMeals([]);
      return;
    }

    let isMounted = true; // Prevent state updates if component unmounts
    
    async function loadMealIdeas() {
      setLoading(true);
      setError(null);
      
      try {
        const meals = await fetchMealIdeas(ingredient);
        if (isMounted) {
          setMeals(meals || []);
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed to load meal ideas. Please try again.");
          setMeals([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMealIdeas();

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, [ingredient]);

  // Don't render anything if no ingredient is selected
  if (!ingredient) {
    return null;
  }

  return (
    <div>
      <h2>Here are some meal ideas to cook with {ingredient}</h2>
      
      {loading && <p>Loading meal ideas...</p>}
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {!loading && !error && meals.length === 0 && (
        <p>No meal ideas found for {ingredient}!</p>
      )}
      
      {!loading && !error && meals.length > 0 && (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal}>{meal.strMeal}</li>
          ))}
        </ul>
      )}
    </div>
  );
}