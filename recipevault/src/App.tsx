import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./Auth/LoginPage";
import RegisterPage from "./Auth/Register";
import ForgotPasswordPage from "./Auth/ForgotPassword";
import AccountMatchPage from "./Auth/AccountMatchPage";
import ResetPasswordPage from "./Auth/ResetPasswordPage";
import EditProfilePage from "./pages/EditProfilePage";
import AddRecipePage from "./pages/AddRecipe";
import RecipeListPage from "./pages/RecipeListPage";
import EditRecipePage from "./pages/EditRecipePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import Profile from "./Auth/Profile";
import PrivateRoute from "./Auth/PrivateRoute";

import "./styles/main.css";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/account-match" element={<AccountMatchPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-recipe"
          element={
            <PrivateRoute>
              <AddRecipePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-recipe/:id"
          element={
            <PrivateRoute>
              <EditRecipePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}