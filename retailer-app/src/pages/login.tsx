import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (userId && username && password) {
      const user = { userId, username, role: "user", retailerId: userId };
      onLogin(user);
      navigate("/dashboard");
    } else {
      alert("Please enter all fields");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Qwipo</h1>
      <p className="login-subtitle">The Future of B2B Commerce 🚀</p>

      <div className="login-box">
        <h2>Retailer / Distributor</h2>
        <p>Access your personalized dashboard.</p>

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Retailer ID / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>

      {/* Register Section */}
      <div className="register-section">
        <p>Don’t have an account?</p>
        <Link to="/register" className="register-btn">
          Register Now
        </Link>
      </div>

      {/* Qwipo Admin Login Link */}
      <div className="admin-section">
        <p>Are you an Admin?</p>
        <button
          className="admin-btn"
          onClick={() => navigate("/admin-login")}
        >
          Login as Qwipo Admin
        </button>
      </div>
    </div>
  );
};

export default Login;
