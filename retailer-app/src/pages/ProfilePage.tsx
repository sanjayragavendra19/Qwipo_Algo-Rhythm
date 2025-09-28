import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

type User = {
  username: string;
  email?: string; // optional since we’re using fixed email
  orders?: { id: string; product: string; price: number }[];
};

type ProfileProps = {
  user: User;
  onLogout: () => void; // prop to reset loggedUser in App.tsx
};

const Profile = ({ user, onLogout }: ProfileProps) => {
  const navigate = useNavigate();

  // Calculate product stats
  const totalOrders = user.orders?.length || 0;
  const totalSpent = user.orders?.reduce((sum, order) => sum + order.price, 0) || 0;
  const productSummary = user.orders?.reduce((summary: Record<string, number>, order) => {
    summary[order.product] = (summary[order.product] || 0) + 1;
    return summary;
  }, {}) || {};

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>{user.username}'s Profile</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </header>

      <section className="profile-info">
        <h2>Account Information</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> prasanth25@gmail.com
        </p>
      </section>

      {user.orders && user.orders.length > 0 && (
        <section className="profile-orders">
          <h2>My Orders</h2>

          <div className="orders-stats">
            <p><strong>Total Orders:</strong> {totalOrders}</p>
            <p><strong>Total Spent:</strong> ₹{totalSpent}</p>
            <p><strong>Products Bought:</strong></p>
            <ul>
              {Object.entries(productSummary).map(([product, count]) => (
                <li key={product}>
                  {product} × {count}
                </li>
              ))}
            </ul>
          </div>

          <div className="orders-list">
            {user.orders.map((order) => (
              <div key={order.id} className="order-card">
                <p>
                  <strong>Product:</strong> {order.product}
                </p>
                <p>
                  <strong>Price:</strong> ₹{order.price}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <button
        className="logout-btn"
        onClick={() => {
          onLogout(); // clear loggedUser in App.tsx
          navigate("/login"); // redirect to login page
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
