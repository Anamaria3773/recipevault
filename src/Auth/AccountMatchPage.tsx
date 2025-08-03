import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

function AccountMatchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const searchValue = query.get("q") || "";

  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!searchValue) return;

    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        const allUsers: User[] = response.data;

        const matches = allUsers.filter(
          (user) =>
            user.email.toLowerCase() === searchValue.toLowerCase() ||
            user.username.toLowerCase() === searchValue.toLowerCase()
        );

        if (matches.length > 0) {
          setMatchedUsers(matches);
        } else {
          setNotFound(true);
        }
      })
      .catch((error) => {
        console.error("Search error:", error);
        setNotFound(true);
      });
  }, [searchValue]);

  const handleSelect = (userId: number) => {
    navigate(`/reset-password?userId=${userId}`);
  };

  return (
    <div className="container">
      <div className="card centered-card">
        <h2>Identify Your Account</h2>
        <p>These accounts matched your search.</p>

        {matchedUsers.map((user) => (
          <div key={user.id} className="account-card">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
              alt="avatar"
              className="avatar"
            />
            <div className="account-info">
              <strong>{user.firstName} {user.lastName}</strong>
              <p>{user.email}</p>
              <button
                onClick={() => handleSelect(user.id)}
                className="button-secondary"
              >
                This is my account
              </button>
            </div>
          </div>
        ))}

        {notFound && (
          <div className="error-message" style={{ marginTop: "20px" }}>
            <strong>No Search Results</strong>
            <p>
              Your search did not return any results. Please try again with other information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountMatchPage;