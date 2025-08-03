import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

function ForgotPasswordPage() {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchValue) {
      setError("Please enter your email or username.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users");
      const users: User[] = await response.json();

      const matches = users.filter((user: User) =>
        user.email?.toLowerCase() === searchValue.toLowerCase() ||
        user.username?.toLowerCase() === searchValue.toLowerCase()
      );

      if (matches.length > 0) {
        navigate(`/account-match?q=${encodeURIComponent(searchValue)}`);
      } else {
        setError("No user found with this email or username.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card centered-card">
        <h2>Find Your Account</h2>
        <p>Please enter your email or username</p>
        <input
          type="text"
          placeholder="Email or Username"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="button-group">
          <button className="button-secondary" onClick={() => navigate("/login")}>
            Cancel
          </button>
          <button className="button-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;