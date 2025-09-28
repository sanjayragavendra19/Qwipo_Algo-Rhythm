import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // reuse same styles

const AdminLogin = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    if (adminId && adminPassword) {
      const user = { adminId, username: "QwipoAdmin", role: "admin" };
      onLogin(user);
      navigate("/admin");
    } else {
      alert("Please enter all fields");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Qwipo Admin</h1>
      <p className="login-subtitle">Admin Portal Access 🔐</p>

      <div className="login-box">
        <h2>Qwipo Admin Login</h2>
        <p>Enter your credentials to manage the platform.</p>

        <input
          type="text"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />

        <button onClick={handleAdminLogin}>Admin Login</button>
      </div>
    </div>
  );
};

export default AdminLogin;
