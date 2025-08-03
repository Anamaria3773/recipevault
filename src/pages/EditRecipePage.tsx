import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Recipe } from "../types/recipe";

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((res) => {
        setRecipe({
          ...res.data,
          ingredients: Array.isArray(res.data.ingredients)
            ? res.data.ingredients
            : res.data.ingredients.split(",").map((i: string) => i.trim()),
          cookingTime: Number(res.data.cookingTime),
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load recipe.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!recipe) return;
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]:
        name === "cookingTime"
          ? Number(value)
          : name === "ingredients"
          ? value.split(",").map((i) => i.trim())
          : value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !recipe) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setRecipe({ ...recipe, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipe) return;

    axios
      .put(`http://localhost:3001/recipes/${id}`, recipe)
      .then(() => {
        setMessage("Recipe updated successfully!");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/recipes");
        }, 2000);
      })
      .catch(() => setError("Failed to save changes."));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!recipe) return null;

  return (
    <div className="container">
      <div className="card">
        <h2>Edit Recipe</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="edit-form-row">
            <div className="form-left">
              <label>Change Image:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {recipe.image && (
                <img
                  src={recipe.image.startsWith('data:') ? recipe.image : `/${recipe.image}`}
                  alt="Preview"
                  className="edit-image-preview"
                />
              )}
            </div>
            <div className="form-right">
              <div className="form-group">
                <label>Title:</label>
                <input name="title" value={recipe.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" value={recipe.description} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Cooking Time (minutes):</label>
                <input
                  name="cookingTime"
                  type="number"
                  value={recipe.cookingTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Difficulty:</label>
                <select name="difficulty" value={recipe.difficulty} onChange={handleChange}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category:</label>
                <input name="category" value={recipe.category} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Ingredients:</label>
                <textarea
                  name="ingredients"
                  value={recipe.ingredients.join(", ")}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <button className="button-primary" type="submit">Save Changes</button>
          {showMessage && (
            <p style={{ color: "green", marginTop: "1rem", transition: "opacity 0.5s" }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditRecipePage;