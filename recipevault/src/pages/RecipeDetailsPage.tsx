import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Recipe } from "../types/recipe";
import "../styles/main.css";

function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error("Error fetching recipe:", err));
  }, [id]);

  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div className="container">
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <img
          src={
            recipe.image.startsWith('data:')
              ? recipe.image
              : recipe.image.startsWith('/')
              ? recipe.image
              : '/' + recipe.image
          }
          alt={recipe.title}
          style={{ width: '50%', height: 'auto', borderRadius: '10px', objectFit: 'cover' }}
        />

        <div style={{ flex: 1 }}>
          <h2>{recipe.title}</h2>
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Cooking Time:</strong> {recipe.cookingTime} min</p>
          <p><strong>Description:</strong> {recipe.description}</p>

          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>

          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailsPage;