import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import "../css/Account.css";

const Account = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [setAccountData] = useState(null);

  // Sett eksisterende bilde
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://e149-51-174-77-66.ngrok-free.app/api/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setAccountData(data);
        setProfileImage(data.profileImage);
      } catch (err) {
        console.error("Kunne ikke hente bruker:", err);
      }
    };

    fetchUser();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await fetch(
        "https://e149-51-174-77-66.ngrok-free.app/api/upload-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data.filename) {
        setProfileImage(data.filename);
        setPreview(null);
      }
    } catch (error) {
      console.error("Feil ved opplasting:", error);
    }
  };

  return (
    <div className="account-container">
      <h2>My Account</h2>

      <div className="account-header">
        <div className="profile-picture-wrapper">
          <label htmlFor="avatar-upload" className="avatar-overlay">
            <img
              src={
                preview ||
                (profileImage
                  ? `https://e149-51-174-77-66.ngrok-free.app/uploads/${profileImage}`
                  : " https://e149-51-174-77-66.ngrok-free.app/uploads/default-avatar.png")
              }
              alt="Profile Picture"
              className="profile-avatar"
            />
            <div className="overlay-text">Edit Picture</div>
          </label>
          <input
            type="file"
            id="avatar-upload"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="user-info">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>

      <div className="account-tabs">
        <button
          onClick={() => setActiveTab("profile")}
          className={activeTab === "profile" ? "active" : ""}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={activeTab === "contact" ? "active" : ""}
        >
          Contact information
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={activeTab === "password" ? "active" : ""}
        >
          Change password
        </button>
      </div>

      <div className="account-tab-content">
        {activeTab === "profile" && (
          <div>
            <h3>Contact information</h3>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <h3>Contact information</h3>
            <input type="text" placeholder="Tlf" />
            <input type="text" placeholder="Address" />
            <button>Save</button>
          </div>
        )}

        {activeTab === "password" && (
          <div>
            <h3>Update password</h3>
            <input type="password" placeholder="New password" />
            <input type="password" placeholder="Confirm new password" />
            <button>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
