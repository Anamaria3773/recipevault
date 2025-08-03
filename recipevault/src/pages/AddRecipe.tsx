import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddRecipe() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: "",
    cookingTime: "",
    difficulty: "Easy",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (form.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters.";
    if (form.category.trim() === "") newErrors.category = "Category is required.";
    if (form.description.trim().length < 10) newErrors.description = "Description must be at least 10 characters.";
    if (form.ingredients.trim().length < 10) newErrors.ingredients = "Ingredients must be at least 10 characters.";
    if (form.instructions.trim().length < 10) newErrors.instructions = "Instructions must be at least 10 characters.";
    if (!form.cookingTime || Number(form.cookingTime) <= 0) newErrors.cookingTime = "Cooking time must be a positive number.";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    axios.post("http://localhost:3001/recipes", form).then(() => {
      setMessage("Recipe added successfully!");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate("/recipes");
      }, 2000);
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Add Recipe</h2>
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Title:</label>
              <input name="title" value={form.title} onChange={handleChange} />
              {errors.title && <p className="error-message">{errors.title}</p>}
            </div>
    
            <div className="form-group">
              <label>Category:</label>
              <input name="category" value={form.category} onChange={handleChange} />
              {errors.category && <p className="error-message">{errors.category}</p>}
            </div>
    
            <div className="form-group">
              <label>Description:</label>
              <textarea name="description" value={form.description} onChange={handleChange} />
              {errors.description && <p className="error-message">{errors.description}</p>}
            </div>
    
            <div className="form-group">
              <label>Ingredients:</label>
              <textarea name="ingredients" value={form.ingredients} onChange={handleChange} />
              {errors.ingredients && <p className="error-message">{errors.ingredients}</p>}
            </div>
    
            <div className="form-group">
              <label>Instructions:</label>
              <textarea name="instructions" value={form.instructions} onChange={handleChange} />
              {errors.instructions && <p className="error-message">{errors.instructions}</p>}
            </div>
    
            <div className="form-group">
              <label>Image Upload:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="recipe-image"
                  style={{ marginTop: "1rem" }}
                />
              )}
            </div>
            
            <div className="form-group">
              <label>Cooking Time (minutes):</label>
              <input
                name="cookingTime"
                type="number"
                value={form.cookingTime}
                onChange={handleChange}
              />
              {errors.cookingTime && <p className="error-message">{errors.cookingTime}</p>}
            </div>
            
            <div className="form-group">
              <label>Difficulty:</label>
              <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <button type="submit" className="button-primary">Save</button>
            
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

export default AddRecipe;