import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [userHistory, setUserHistory] = useState<string[] | null>(null);

  const handleLogout = () => {
    navigate("/admin-login");
  };

  const handleSearch = () => {
    if (searchId === "115") {
      setUserHistory([
        "🛒 Order #2025: 3 units of Juice",
        "🛒 Order #2026: 2 units of Soap",
        "🛒 Order #2027: 1 unit of Printer",
      ]);
    } else {
      setUserHistory(null);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <h1>Qwipo Admin Dashboard</h1>
        <div className="admin-info">
          <span>👤 {user?.username || "Admin"}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>📦 Total Orders</h3>
          <p>12,340</p>
        </div>
        <div className="stat-card">
          <h3>👥 Retailers</h3>
          <p>1,240</p>
        </div>
        <div className="stat-card">
          <h3>💰 Revenue</h3>
          <p>₹ 54.2L</p>
        </div>
        <div className="stat-card">
          <h3>🛍️ Products</h3>
          <p>8,765</p>
        </div>
      </section>

      {/* User Search Section */}
      <section className="user-search-section">
        <h2>Search User Sales History</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter User ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {userHistory && (
          <div className="user-history">
            <h3>Sales History for User ID {searchId}:</h3>
            <ul>
              {userHistory.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {searchId && !userHistory && (
          <p>No sales history found for User ID {searchId}</p>
        )}
      </section>

      {/* Recent Activities */}
      <section className="activity-section">
        <h2>Recent Activities</h2>
        <ul>
          <li>✔️ Retailer #1023 placed an order for 120 units</li>
          <li>⚡ New product "Sunrise Rice 10kg" added</li>
          <li>📊 Sales report generated for South Zone</li>
          <li>🔄 Stock updated for 56 products</li>
        </ul>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <h2>Sales Analytics</h2>
        <div className="chart-placeholder">
          <img
            src="/images/sample-graph.png"
            alt="Sample Sales Graph"
            style={{ width: "100%", height: "250px", objectFit: "contain" }}
          />
        </div>

        {/* Download Excel Button */}
        <div style={{ marginTop: "15px", textAlign: "right" }}>
          <a
            href="/demo.xlsx"
            download="demo.xlsx"
            className="download-btn"
          >
            📥 Download Excel
          </a>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
