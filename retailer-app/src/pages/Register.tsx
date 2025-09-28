import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"; // ✅ reuse same styles

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (name && email && phone && password) {
      alert("✅ Registration Successful!");
      navigate("/"); // redirect back to login
    } else {
      alert("⚠️ Please fill in all fields");
    }
  };

  return (
    <div className="login-container">
      {/* Header */}
      <h1 className="login-title">Qwipo</h1>
      <p className="login-subtitle">Create your account 🚀</p>

      {/* Register Box */}
      <div className="login-box">
        <h2>Register</h2>
        <p>Fill the details to create your account.</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>
      </div>

      {/* Back to Login */}
      <div className="register-section">
        <p>Already have an account?</p>
        <Link to="/" className="register-btn">
          Back to Login
        </Link>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        © 2025 <span>Qwipo</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default Register;
