import { Link } from "react-router-dom";
import { BrandNavLink } from "./BrandNavLink";
import styles from "./Nav.module.css";
import { useAuth } from "../Auth/AuthContext";

export function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>
        <Link to="/">RecipeVault</Link>
      </h1>
      <menu className={styles.mainMenu}>
        <li>
          <BrandNavLink to="/">Home</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="/recipes">View Recipes</BrandNavLink>
        </li>
        {user ? (
          <>
            <li>
              <BrandNavLink to="/add-recipe">Add Recipe</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="/profile">Profile</BrandNavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                }}
                className={styles.link}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <BrandNavLink to="/login">Login</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="/register">Register</BrandNavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
