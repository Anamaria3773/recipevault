import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="container">
      <div className="card profile-card">
        {user && (
          (() => {
            const seed =
              user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.username;
            return (
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}`}
                alt="User avatar"
                className="avatar"
              />
            );
          })()
        )}

        {(() => {
          const displayName = user?.firstName || user?.username || "User";
          return (
            <>
              <h1>Welcome,</h1>
              <h2 className="profile-name">{displayName}!</h2>
            </>
          );
        })()}

        <div className="button-group">
          <button className="button-secondary" onClick={handleEdit}>Edit Profile</button>
          <button className="button-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );

}

export default Profile;
