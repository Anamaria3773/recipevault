import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/users", {
        firstName,
        lastName,
        username,
        email,
        password
      });
      navigate("/login");
    } catch {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="container">
      <div className="card centered-card">
        <h2>Create an Account</h2>
        <form className="centered-form" onSubmit={handleRegister}>
          <div className="form-group">
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <br />
          <button type="submit" className="button-primary">Register</button>
        </form>

<br />

        <div className="auth-links">
          <Link to="/login" className="link-secondary">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;