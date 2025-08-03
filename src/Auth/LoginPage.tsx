import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    axios
      .get(`http://localhost:3001/users?email=${email}&password=${password}`)
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data[0];
          login(user);
          navigate("/profile");
        } else {
          setError("Invalid email or password.");
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="container">
      <div className="card centered-card">
        <h2>Login</h2>
        <form className="centered-form" onSubmit={handleLogin}>
          <div className="form-group">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="button-primary">Login</button>

        </form>

        <br />
        <div className="auth-links">
          <Link to="/forgot-password" className="link-secondary">Forgot Password?</Link>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <Link to="/register" className="button-secondary">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;