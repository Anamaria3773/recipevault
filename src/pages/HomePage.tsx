import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const featuredRecipes = [
  {
    id: 10,
    title: "Tomato Soup",
    image: "images/tomato-soup.jpg",
    category: "Soup",
    cookingTime: "25 min",
    description: "Creamy tomato soup with herbs.",
  },
  {
    id: "46",
    title: "Honey Garlic Chicken Thighs",
    image: "images/garlic-chicken-thighs.jpg",
    category: "Dinner",
    cookingTime: "45 min",
    description: "Tender chicken thighs glazed with a sweet and savory sauce.",
  },
  {
    id: "41",
    title: "Tiramisu",
    image: "images/tiramisu.jpg",
    category: "Dessert",
    cookingTime: "180 min",
    description: "Classic Italian dessert with coffee and mascarpone.",
  },
];

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to RecipeVault!</h1>
      
      <p className="home-subtitle">
        Start creating and sharing your favorite recipes.
      </p>
      
      <div className="home-button-wrapper">
        <Link to="/recipes">
          <button className="button-primary">View Recipes</button>
        </Link>
      </div>
      
      <div className="recipe-grid">
        {featuredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card-content"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (user) {
                navigate(`/recipes/${recipe.id}`);
              } else {
                navigate("/login");
              }
            }}
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
            <p>{recipe.description}</p>
            <p className="recipe-meta">
              <strong>{recipe.category}</strong> • {recipe.cookingTime}
            </p>
          </div>
        ))}
      </div>

  <p className="sign-up-note">
    For best experience, please sign up.
  </p>
</div>

  );
};

export default HomePage;