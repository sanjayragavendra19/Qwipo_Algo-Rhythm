import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUserCircle, FaGift } from "react-icons/fa";
import "./UserDashboard.css";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

type RecommendationResponse = {
  topSelling: Product[];
  personalized: Product[];
  seasonal: Product[];
};

const UserDashboard = ({ user }: { user: any }) => {
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    import("../recommendations.json").then((json) =>
      setData(json as RecommendationResponse)
    );
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    setShowCart(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
  };

  const filterProducts = (products: Product[]) =>
    products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

  const renderProducts = (products: Product[]) => (
    <div className="product-grid">
      {filterProducts(products)
        .slice(0, 10)
        .map((p) => (
          <div key={p.id} className="product-card">
            <div className="price-tag">₹{p.price.toFixed(2)}</div>
            <img src={p.image} alt={p.name} className="product-img" />
            <h3 className="product-title">{p.name}</h3>
            <p className="product-category">{p.category}</p>
            <button className="add-btn" onClick={() => addToCart(p)}>
              🛒 Add to Cart
            </button>
          </div>
        ))}
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Qwipo B2B</h1>

        {/* Search */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Icons */}
        <div className="header-icons">
          <div style={{ position: "relative" }}>
            <FaShoppingCart
              className="icon"
              title="View Cart"
              onClick={() => setShowCart(!showCart)}
            />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </div>
          <FaUserCircle
            className="icon"
            title="Profile"
            onClick={() => navigate("/profile")}
          />
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <FaGift className="hero-icon" />
        <div>
          <h2>Big Festive Sale 🎉</h2>
          <p>Save up to 30% on bulk orders. Limited time only!</p>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="section-title">📦 Categories</h2>
        <div className="category-grid">
          {[
            "Electronics",
            "Fashion",
            "Beverages",
            "Snacks",
            "Health",
            "Stationery",
            "Household",
            "Gifts",
          ].map((cat) => (
            <div key={cat} className="category-card">
              <p>{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Sections */}
      <section>
        <h2 className="section-title">🔥 Top Selling Products</h2>
        {data?.topSelling ? renderProducts(data.topSelling) : <p>Loading...</p>}
      </section>

      <section>
        <h2 className="section-title">⭐ Personalized Recommendations</h2>
        {data?.personalized ? renderProducts(data.personalized) : <p>Loading...</p>}
      </section>

      <section>
        <h2 className="section-title">🌸 Seasonal Products</h2>
        {data?.seasonal ? renderProducts(data.seasonal) : <p>Loading...</p>}
      </section>

      <section>
        <h2 className="section-title">🚀 Trending Now</h2>
        {data?.topSelling
          ? renderProducts(data.topSelling.slice(3, 8))
          : <p>Loading...</p>}
      </section>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${showCart ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart 🛒</h3>
          <button className="close-cart" onClick={() => setShowCart(false)}>
            ×
          </button>
        </div>
        {cart.length ? (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>₹{item.price.toFixed(2)}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ❌
              </button>
            </div>
          ))
        ) : (
          <p>No items in cart</p>
        )}
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default UserDashboard;
