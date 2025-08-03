import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";

function EditProfilePage() {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setErrorFirstName("");
    setErrorLastName("");
    setErrorUsername("");
    setErrorEmail("");
    setErrorPassword("");
    setSuccess("");

    let isValid = true;
    if (firstName.trim() === "") {
      setErrorFirstName("First name is required.");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setErrorLastName("Last name is required.");
      isValid = false;
    }
    if (username.trim() === "") {
      setErrorUsername("Username is required.");
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail("Please enter a valid email address.");
      isValid = false;
    }
    if (password || confirmPassword) {
      if (password.length < 5) {
        setErrorPassword("Password must be at least 5 characters.");
        isValid = false;
      } else if (password !== confirmPassword) {
        setErrorPassword("Passwords do not match.");
        isValid = false;
      }
    }
    if (!isValid) return;

    try {
      const updateData: any = {
        firstName,
        lastName,
        username,
        email,
      };
      if (password) {
        updateData.password = password;
      }
      await axios.patch(`http://localhost:3001/users/${user.id}`, updateData);
      login({
        id: user.id,
        username,
        email,
        firstName,
        lastName,
      });
      setSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      console.error("Update error:", err);
      setErrorEmail("Something went wrong. Try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
            />
            {errorFirstName && <p className="error-message">{errorFirstName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
            {errorLastName && <p className="error-message">{errorLastName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            {errorUsername && <p className="error-message">{errorUsername}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {errorEmail && <p className="error-message">{errorEmail}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password (optional):</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            {errorPassword && <p className="error-message">{errorPassword}</p>}
          </div>

          <button type="submit" className="button-primary">Save</button>
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
