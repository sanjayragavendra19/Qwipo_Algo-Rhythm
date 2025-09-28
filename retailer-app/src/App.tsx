import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminLogin from "./pages/Adminlogin";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/ProfilePage";

function App() {
  const [loggedUser, setLoggedUser] = useState<any>(null);

  // Logout handler
  const handleLogout = () => {
    setLoggedUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login onLogin={setLoggedUser} />} />
        <Route path="/login" element={<Login onLogin={setLoggedUser} />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Retailer Dashboard */}
        <Route
          path="/dashboard"
          element={
            loggedUser?.role === "user" ? (
              <UserDashboard user={loggedUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* User Profile Page */}
        <Route
          path="/profile"
          element={
            loggedUser?.role === "user" ? (
              <Profile user={loggedUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Admin Login Page */}
        <Route
          path="/admin-login"
          element={<AdminLogin onLogin={setLoggedUser} />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            loggedUser?.role === "admin" ? (
              <AdminDashboard user={loggedUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/admin-login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
