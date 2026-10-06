import { useState } from "react";
import "./App.css";

const cafes = [
  {
    id: 1,
    name: "The Daily Grind",
    location: "Banjara Hills, Hyderabad",
    rating: 4.8,
    price: 350,
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
  },
  {
    id: 2,
    name: "Bean & Brew Studio",
    location: "Koramangala, Bangalore",
    rating: 4.7,
    price: 400,
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
  },
  {
    id: 3,
    name: "Aroma Corner",
    location: "Bandra West, Mumbai",
    rating: 4.9,
    price: 300,
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
  },
  {
    id: 4,
    name: "Velvet Cup Cafe",
    location: "Connaught Place, Delhi",
    rating: 4.6,
    price: 450,
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);

  const filteredCafes = cafes.filter(
    (cafe) =>
      cafe.name.toLowerCase().includes(search.toLowerCase()) ||
      cafe.location.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <h2>Cafe<span>Bite</span> ☕</h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#cafes">Cafes</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero cafe-hero">
        <div className="hero-content">
          <h1>Sip, Relax & Connect</h1>

          <p>
            Discover cozy coffee shops and artisanal bakeries near you.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search cafe or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="cafe-btn">🔍 Search</button>
          </div>
        </div>
      </section>

      {/* Cafes Section */}
      <section className="hotels-section" id="cafes">

        <h2>Popular Cafes</h2>

        <p className="subtitle">
          Handpicked spots for great coffee and vibes
        </p>

        <div className="hotel-grid">

          {filteredCafes.map((cafe) => (

            <div className="hotel-card" key={cafe.id}>

              <div className="image-container">

                <img
                  src={cafe.image}
                  alt={cafe.name}
                />

                <button
                  className="favorite"
                  onClick={() => toggleFavorite(cafe.id)}
                >
                  {favorites.includes(cafe.id) ? "❤️" : "🤍"}
                </button>

              </div>

              <div className="hotel-info">

                <h3>{cafe.name}</h3>

                <p className="location">
                  📍 {cafe.location}
                </p>

                <div className="hotel-bottom">

                  <span className="rating">
                    ⭐ {cafe.rating}
                  </span>

                  <span className="price">
                    ₹{cafe.price}
                    <small> avg. for two</small>
                  </span>

                </div>

                <button
                  className="book-btn cafe-btn"
                  onClick={() => setSelectedCafe(cafe)}
                >
                  Reserve Table
                </button>

              </div>

            </div>

          ))}

        </div>

        {filteredCafes.length === 0 && (
          <p className="no-results">
            No cafes found 😔
          </p>
        )}

      </section>

      {/* About Section */}
      <section className="about" id="about">

        <h2>Why Choose CafeBite?</h2>

        <div className="features">

          <div>
            <span>🥐</span>
            <h3>Fresh Pastries</h3>
            <p>Baked fresh daily with premium ingredients.</p>
          </div>

          <div>
            <span>☕</span>
            <h3>Artisan Coffee</h3>
            <p>Sourced from the finest coffee plantations.</p>
          </div>

          <div>
            <span>🌿</span>
            <h3>Cozy Ambiance</h3>
            <p>Perfect spaces to work, read, or catch up.</p>
          </div>

        </div>

      </section>

      {/* Reservation Modal */}
      {selectedCafe && (

        <div className="modal">

          <div className="modal-content">

            <button
              className="close"
              onClick={() => setSelectedCafe(null)}
            >
              ✕
            </button>

            <h2>Reserve a Table ☕</h2>

            <h3>{selectedCafe.name}</h3>

            <p>📍 {selectedCafe.location}</p>

            <p className="modal-price">
              Avg. ₹{selectedCafe.price} for two
            </p>

            <input type="text" placeholder="Your Name" />

            <input type="text" placeholder="Number of Guests" />

            <input type="date" />

            <button
              className="confirm-btn cafe-btn"
              onClick={() => {
                alert("Table reserved successfully! 🥐");
                setSelectedCafe(null);
              }}
            >
              Confirm Reservation
            </button>

          </div>

        </div>

      )}

      {/* Footer */}
      <footer>
        <p>© 2026 CafeBite. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;