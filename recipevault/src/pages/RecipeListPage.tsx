import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import { useAuth } from "../Auth/AuthContext";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  category?: string;
  difficulty?: string;
  cookingTime?: string;
}

function RecipeListPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  const { user } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:3001/recipes").then((res) => setRecipes(res.data));
  }, []);

  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      axios.delete(`http://localhost:3001/recipes/${selectedId}`).then(() => {
        setRecipes((prev) => prev.filter((r) => r.id !== selectedId));
        setShowModal(false);
        setSelectedId(null);
      });
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div className="container">
      <h2>All Recipes</h2>
      <div className="recipe-grid">
        {currentRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card-content">
            <Link
              to={user ? `/recipes/${recipe.id}` : '/login'}
              style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
            >
              <div className="card-image-container">
                <img
                  src={
                    recipe.image.startsWith("data:")
                      ? recipe.image
                      : `/${recipe.image.replace(/^\/+/g, "")}`
                  }
                  alt={recipe.title}
                  className="recipe-image"
                />
              </div>
              <h3>{recipe.title}</h3>
              <p><strong>Category:</strong> {recipe.category}</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
              <p><strong>Cooking Time:</strong> {recipe.cookingTime} min</p>
              <p>{recipe.description}</p>
            </Link>
            {user && (
              <div className="button-group">
                <button className="delete-btn" onClick={() => confirmDelete(recipe.id)}>
                  Delete
                </button>
                <Link className="edit-btn" to={`/edit-recipe/${recipe.id}`}>Edit</Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Confirm Deletion</h2>
            <p className="modal-message">Are you sure you want to delete this recipe? This action cannot be undone.</p>
            <div className="button-group spaced-buttons">
              <button className="button-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="button-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeListPage;
