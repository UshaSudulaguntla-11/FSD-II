import React, { useState, useEffect } from "react";
import "./App.css";

const initialCafes = [
  {
    id: 1,
    name: "The Daily Grind",
    location: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    rating: 4.8,
    price: 350,
    tags: ["Cozy", "Work-friendly", "Aesthetic"],
    openingHours: "8:00 AM - 11:00 PM",
    description: "A sanctuary for digital nomads and coffee lovers alike, offering artisanal pour-overs and ergonomic workstations amidst lush greenery.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
    menu: [
      { name: "Signature Cold Brew", price: 220, category: "Beverages" },
      { name: "Hazelnut Latte", price: 260, category: "Beverages" },
      { name: "Butter Croissant", price: 180, category: "Bakery" },
      { name: "Avocado Sourdough Toast", price: 340, category: "Eats" }
    ],
    reviewsList: [
      { user: "Aarav M.", rating: 5, comment: "Best cold brew in Hyderabad! Super fast Wi-Fi for working." },
      { user: "Sneha R.", rating: 4.5, comment: "Aesthetic is unmatched. Croissants melt in your mouth." }
    ]
  },
  {
    id: 2,
    name: "Bean & Brew Studio",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    rating: 4.7,
    price: 400,
    tags: ["Aesthetic", "Rooftop", "Cozy"],
    openingHours: "7:30 AM - 10:30 PM",
    description: "Nestled in Bangalore's tech hub, featuring a breezy rooftop terrace and ethically sourced single-origin beans.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
    menu: [
      { name: "Vietnamese Iced Coffee", price: 280, category: "Beverages" },
      { name: "Flat White", price: 240, category: "Beverages" },
      { name: "Blueberry Cheesecake", price: 320, category: "Bakery" },
      { name: "Peri Peri Paneer Panini", price: 290, category: "Eats" }
    ],
    reviewsList: [
      { user: "Rohan K.", rating: 5, comment: "The rooftop view during sunset is breathtaking." },
      { user: "Priya S.", rating: 4, comment: "Great vibe for weekend dates." }
    ]
  },
  {
    id: 3,
    name: "Aroma Corner",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    rating: 4.9,
    price: 300,
    tags: ["Cozy", "Aesthetic"],
    openingHours: "8:00 AM - 12:00 AM",
    description: "Old-world Mumbai charm meets modern artisanal brewing. Famous for our secret blend espresso and warm community poetry nights.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
    menu: [
      { name: "Classic Espresso", price: 190, category: "Beverages" },
      { name: "Affogato Al Caffe", price: 290, category: "Dessert" },
      { name: "Almond Croissant", price: 210, category: "Bakery" },
      { name: "Mushroom Truffle Quiche", price: 350, category: "Eats" }
    ],
    reviewsList: [
      { user: "Kabir D.", rating: 5, comment: "Absolute gem in Bandra. Espresso is perfection." },
      { user: "Ananya P.", rating: 5, comment: "Coziest corners to read a book." }
    ]
  },
  {
    id: 4,
    name: "Velvet Cup Cafe",
    location: "Connaught Place, Delhi",
    city: "Delhi",
    rating: 4.6,
    price: 450,
    tags: ["Rooftop", "Work-friendly", "Aesthetic"],
    openingHours: "9:00 AM - 11:30 PM",
    description: "Grand architecture, plush velvet seating, and decadent hot chocolates crafted to conquer Delhi winters.",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814",
    menu: [
      { name: "Belgian Hot Chocolate", price: 310, category: "Beverages" },
      { name: "Caramel Macchiato", price: 270, category: "Beverages" },
      { name: "Red Velvet Pastry", price: 250, category: "Bakery" },
      { name: "Smoked Chicken Wrap", price: 380, category: "Eats" }
    ],
    reviewsList: [
      { user: "Simran T.", rating: 4.5, comment: "Hot chocolate is legendary here!" },
      { user: "Vikram N.", rating: 4, comment: "Classy ambiance in the heart of CP." }
    ]
  }
];

function App() {
  const [cafes, setCafes] = useState(initialCafes);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("rating-desc");
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("home"); // home, cafes, favorites, about, contact

  const [selectedCafeForModal, setSelectedCafeForModal] = useState(null);
  const [bookingCafe, setBookingCafe] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [myBookingsModalOpen, setMyBookingsModalOpen] = useState(false);

  // Quiz state
  const [quizMood, setQuizMood] = useState("");
  const [quizResult, setQuizResult] = useState(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  // New review state
  const [newReviewUser, setNewReviewUser] = useState("");
  const [newReviewRating, setNewReviewRating] = useState("5");
  const [newReviewComment, setNewReviewComment] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
      showToast("Removed from wishlist 🤍");
    } else {
      setFavorites([...favorites, id]);
      showToast("Added to wishlist ❤️");
    }
  };

  const filteredCafes = cafes
    .filter((cafe) => {
      const matchesSearch =
        cafe.name.toLowerCase().includes(search.toLowerCase()) ||
        cafe.location.toLowerCase().includes(search.toLowerCase());
      const matchesCity = selectedCity === "All" || cafe.city === selectedCity;
      const matchesTag = selectedTag === "All" || cafe.tags.includes(selectedTag);
      const matchesFavTab = activeTab !== "favorites" || favorites.includes(cafe.id);

      return matchesSearch && matchesCity && matchesTag && matchesFavTab;
    })
    .sort((a, b) => {
      if (sortBy === "rating-desc") return b.rating - a.rating;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (!quizMood) return;
    let matched = cafes[0];
    if (quizMood === "work") matched = cafes.find((c) => c.tags.includes("Work-friendly")) || cafes[0];
    else if (quizMood === "aesthetic") matched = cafes.find((c) => c.tags.includes("Aesthetic")) || cafes[1];
    else if (quizMood === "rooftop") matched = cafes.find((c) => c.tags.includes("Rooftop")) || cafes[2];
    else if (quizMood === "cozy") matched = cafes.find((c) => c.tags.includes("Cozy")) || cafes[3];

    setQuizResult(matched);
  };

  return (
    <div className="app-container">
      {toastMessage && (
        <div className="toast-notification">
          <span>☕</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setActiveTab("home")}>
          <div className="brand-icon">☕</div>
          <h2>
            Cafe<span>Bite</span>
          </h2>
        </div>

        <div className="nav-links">
          <button
            onClick={() => setActiveTab("home")}
            className={activeTab === "home" ? "active-link" : ""}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("cafes")}
            className={activeTab === "cafes" ? "active-link" : ""}
          >
            Explore Cafes
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={activeTab === "favorites" ? "active-link" : ""}
          >
            Wishlist {favorites.length > 0 && `(${favorites.length})`}
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={activeTab === "about" ? "active-link" : ""}
          >
            About Us
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={activeTab === "contact" ? "active-link" : ""}
          >
            Contact
          </button>
        </div>

        <div className="nav-actions">
          <button
            onClick={() => setMyBookingsModalOpen(true)}
            className="bookings-badge-btn"
          >
            🎟️ My Bookings {bookings.length > 0 && <span>{bookings.length}</span>}
          </button>
        </div>
      </nav>

      <main className="main-content">
        {/* HOME VIEW */}
        {activeTab === "home" && (
          <div>
            <section className="hero-section">
              <div className="hero-content">
                <span className="hero-tag">✨ Discover Artisan Coffee Culture</span>
                <h1>
                  Sip, Relax & <span>Connect</span>
                </h1>
                <p>
                  Handpicked cozy coffee shops, rooftop haunts, and aesthetic bakeries with instant table reservations.
                </p>

                <div className="hero-search-box">
                  <div className="search-input-group">
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search by cafe name or city..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => setActiveTab("cafes")}
                    className="cafe-btn primary-btn"
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            </section>

            {/* Quiz Section */}
            <section className="quiz-section">
              <div className="quiz-card">
                <span className="quiz-badge">Interactive Recommendation</span>
                <h2>Find Your Perfect Brew & Mood Match</h2>
                <p>Select your seating mood and let our coffee engine pick the best spot for you!</p>

                <form onSubmit={handleQuizSubmit} className="quiz-form">
                  <select
                    value={quizMood}
                    onChange={(e) => setQuizMood(e.target.value)}
                    required
                  >
                    <option value="">-- Choose your current vibe --</option>
                    <option value="work">💻 Productive Work & High-speed Wi-Fi</option>
                    <option value="aesthetic">📸 Aesthetic Vibes & Instagram Spots</option>
                    <option value="rooftop">🌅 Breezy Rooftop & Sunset Views</option>
                    <option value="cozy">📖 Cozy Corner & Warm Bookish Vibe</option>
                  </select>
                  <button type="submit" className="cafe-btn primary-btn">
                    Match Vibe ✨
                  </button>
                </form>

                {quizResult && (
                  <div className="quiz-result-box">
                    <div className="quiz-result-info">
                      <img src={quizResult.image} alt={quizResult.name} />
                      <div>
                        <span className="top-rec">Top Recommendation</span>
                        <h4>{quizResult.name}</h4>
                        <p>📍 {quizResult.location} • ⭐ {quizResult.rating}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCafeForModal(quizResult)}
                      className="cafe-btn secondary-btn"
                    >
                      View Cafe
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Featured Grid */}
            <section className="featured-section">
              <div className="section-header">
                <div>
                  <h2>Featured Hotspots</h2>
                  <p>Handpicked spots trending among coffee connoisseurs</p>
                </div>
                <button
                  onClick={() => setActiveTab("cafes")}
                  className="view-all-link"
                >
                  View All Cafes →
                </button>
              </div>

              <div className="cafe-grid">
                {cafes.slice(0, 4).map((cafe) => (
                  <div
                    key={cafe.id}
                    onClick={() => setSelectedCafeForModal(cafe)}
                    className="cafe-card"
                  >
                    <div className="card-image-box">
                      <img src={cafe.image} alt={cafe.name} />
                      <button
                        onClick={(e) => toggleFavorite(cafe.id, e)}
                        className="fav-icon-btn"
                      >
                        {favorites.includes(cafe.id) ? "❤️" : "🤍"}
                      </button>
                      <span className="rating-badge">⭐ {cafe.rating}</span>
                    </div>

                    <div className="card-info">
                      <h3>{cafe.name}</h3>
                      <p className="location-text">📍 {cafe.location}</p>

                      <div className="tags-row">
                        {cafe.tags.map((tag, idx) => (
                          <span key={idx} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="card-bottom">
                        <div>
                          <small>Avg for two</small>
                          <span className="price-text">₹{cafe.price}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookingCafe(cafe);
                          }}
                          className="cafe-btn primary-btn sm-btn"
                        >
                          Reserve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CAFES & WISHLIST VIEW */}
        {(activeTab === "cafes" || activeTab === "favorites") && (
          <div className="explore-container">
            <div className="explore-header">
              <h2>{activeTab === "favorites" ? "Your Favorite Wishlist ❤️" : "Explore All Cafes"}</h2>
              <p>
                {activeTab === "favorites" ? "Your saved sanctuary spots for your next coffee run" : "Filter by city, vibe tags, or sort by rating & price"}
              </p>
            </div>

            {/* Filter Toolbar */}
            <div className="filter-toolbar">
              <div className="filter-group">
                <input
                  type="text"
                  placeholder="Search cafe..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="toolbar-search"
                />

                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="toolbar-select"
                >
                  <option value="All">All Cities</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                </select>

                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="toolbar-select"
                >
                  <option value="All">All Vibes</option>
                  <option value="Cozy">Cozy</option>
                  <option value="Work-friendly">Work-friendly</option>
                  <option value="Aesthetic">Aesthetic</option>
                  <option value="Rooftop">Rooftop</option>
                </select>
              </div>

              <div className="sort-group">
                <label>Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="toolbar-select"
                >
                  <option value="rating-desc">Rating: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            {filteredCafes.length > 0 ? (
              <div className="cafe-grid">
                {filteredCafes.map((cafe) => (
                  <div
                    key={cafe.id}
                    onClick={() => setSelectedCafeForModal(cafe)}
                    className="cafe-card"
                  >
                    <div className="card-image-box">
                      <img src={cafe.image} alt={cafe.name} />
                      <button
                        onClick={(e) => toggleFavorite(cafe.id, e)}
                        className="fav-icon-btn"
                      >
                        {favorites.includes(cafe.id) ? "❤️" : "🤍"}
                      </button>
                      <span className="rating-badge">⭐ {cafe.rating}</span>
                    </div>

                    <div className="card-info">
                      <h3>{cafe.name}</h3>
                      <p className="location-text">📍 {cafe.location}</p>

                      <div className="tags-row">
                        {cafe.tags.map((tag, idx) => (
                          <span key={idx} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="card-bottom">
                        <div>
                          <small>Avg for two</small>
                          <span className="price-text">₹{cafe.price}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookingCafe(cafe);
                          }}
                          className="cafe-btn primary-btn sm-btn"
                        >
                          Reserve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results-box">
                <span className="big-emoji">☕😔</span>
                <h3>No cafes found</h3>
                <p>Try adjusting your filters, search criteria, or wishlist.</p>
              </div>
            )}
          </div>
        )}

        {/* ABOUT VIEW */}
        {activeTab === "about" && (
          <div className="static-page-container">
            <div className="static-card">
              <span className="page-tag">Our Story</span>
              <h2>Crafting Moments, One Cup at a Time</h2>
              <p>
                Founded in 2026, CafeBite was born out of a profound passion for exquisite coffee beans, warm pastries, and serene physical spaces where communities can bond, create, and unwind.
              </p>
              <p>
                We partner exclusively with independent artisan roasteries and aesthetic boutique cafes across major cities in India. Every venue listed undergoes a rigorous curation process for ambiance, bean origin quality, cleanliness, and Wi-Fi speed.
              </p>

              <div className="stats-row">
                <div>
                  <h3>50+</h3>
                  <p>Partnered Cafes</p>
                </div>
                <div>
                  <h3>12,000+</h3>
                  <p>Happy Coffee Lovers</p>
                </div>
                <div>
                  <h3>4.8 ⭐</h3>
                  <p>Average Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT VIEW */}
        {activeTab === "contact" && (
          <div className="static-page-container">
            <div className="static-card max-width-sm">
              <span className="page-tag">Get in Touch</span>
              <h2>We'd Love to Hear From You</h2>
              <p className="subtitle-sm">Have a cafe to suggest or feedback about your reservation? Drop us a message!</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Thank you! Your message has been sent successfully ☕");
                  e.target.reset();
                }}
                className="contact-form"
              >
                <div>
                  <label>Your Name</label>
                  <input type="text" required placeholder="Aarav Sharma" />
                </div>
                <div>
                  <label>Email Address</label>
                  <input type="email" required placeholder="aarav@example.com" />
                </div>
                <div>
                  <label>Message</label>
                  <textarea rows="4" required placeholder="Write your thoughts or inquiry..."></textarea>
                </div>
                <button type="submit" className="cafe-btn primary-btn full-width">
                  Send Message 🚀
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* CAFE DETAILS MODAL */}
      {selectedCafeForModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button
              onClick={() => setSelectedCafeForModal(null)}
              className="modal-close-btn"
            >
              ✕
            </button>

            <div className="modal-banner" style={{ backgroundImage: `url(${selectedCafeForModal.image})` }}>
              <div className="modal-banner-content">
                <div className="tags-row">
                  {selectedCafeForModal.tags.map((t, i) => (
                    <span key={i} className="banner-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <h2>{selectedCafeForModal.name}</h2>
                <p>📍 {selectedCafeForModal.location} • ⏰ {selectedCafeForModal.openingHours}</p>
              </div>
            </div>

            <div className="modal-scroll-content">
              <div className="modal-block">
                <h4>About Cafe</h4>
                <p>{selectedCafeForModal.description}</p>
              </div>

              <div className="modal-block">
                <h4>Menu Highlights</h4>
                <div className="menu-grid">
                  {selectedCafeForModal.menu.map((item, idx) => (
                    <div key={idx} className="menu-item">
                      <div>
                        <h5>{item.name}</h5>
                        <small>{item.category}</small>
                      </div>
                      <span className="menu-price">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-block">
                <h4>Customer Reviews</h4>
                <div className="reviews-list">
                  {selectedCafeForModal.reviewsList.map((rev, idx) => (
                    <div key={idx} className="review-card">
                      <div className="review-header">
                        <strong>{rev.user}</strong>
                        <span className="review-rating">⭐ {rev.rating}</span>
                      </div>
                      <p>{rev.comment}</p>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newReviewUser || !newReviewComment) return;
                    const updatedReview = {
                      user: newReviewUser,
                      rating: parseFloat(newReviewRating),
                      comment: newReviewComment
                    };
                    selectedCafeForModal.reviewsList.push(updatedReview);
                    showToast("Review submitted successfully! 🌟");
                    setNewReviewUser("");
                    setNewReviewComment("");
                  }}
                  className="review-form"
                >
                  <h5>Leave a Review</h5>
                  <div className="review-form-row">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={newReviewUser}
                      onChange={(e) => setNewReviewUser(e.target.value)}
                      required
                    />
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(e.target.value)}
                    >
                      <option value="5">⭐ 5.0</option>
                      <option value="4.5">⭐ 4.5</option>
                      <option value="4">⭐ 4.0</option>
                      <option value="3">⭐ 3.0</option>
                    </select>
                  </div>
                  <textarea
                    rows="2"
                    placeholder="Share your coffee experience..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    required
                  ></textarea>
                  <button type="submit" className="cafe-btn secondary-btn sm-btn">
                    Post Review
                  </button>
                </form>
              </div>
            </div>

            <div className="modal-footer">
              <div>
                <small>Estimated Avg Price</small>
                <strong>₹{selectedCafeForModal.price} <span className="light-font">for two</span></strong>
              </div>
              <button
                onClick={() => {
                  const cafeToBook = selectedCafeForModal;
                  setSelectedCafeForModal(null);
                  setBookingCafe(cafeToBook);
                }}
                className="cafe-btn primary-btn"
              >
                Reserve Table Now ☕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE RESERVATION MODAL */}
      {bookingCafe && (
        <div className="modal-overlay">
          <div className="modal-container max-width-sm">
            <button
              onClick={() => setBookingCafe(null)}
              className="modal-close-btn text-dark"
            >
              ✕
            </button>

            <span className="page-tag">Table Reservation</span>
            <h2>{bookingCafe.name}</h2>
            <p className="subtitle-sm">📍 {bookingCafe.location}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newBooking = {
                  id: Date.now(),
                  cafeName: bookingCafe.name,
                  location: bookingCafe.location,
                  name: formData.get("name"),
                  guests: formData.get("guests"),
                  date: formData.get("date"),
                  timeSlot: formData.get("timeSlot")
                };
                setBookings([newBooking, ...bookings]);
                setBookingCafe(null);
                showToast("Table reserved successfully! 🥐🎟️");
                setMyBookingsModalOpen(true);
              }}
              className="reservation-form"
            >
              <div>
                <label>Full Name</label>
                <input type="text" name="name" required placeholder="Aarav Sharma" />
              </div>

              <div className="form-grid-2">
                <div>
                  <label>Guests</label>
                  <select name="guests">
                    <option value="1 Person">1 Person</option>
                    <option value="2 Persons" defaultValue>2 Persons</option>
                    <option value="3-4 Persons">3-4 Persons</option>
                    <option value="5+ Group">5+ Group</option>
                  </select>
                </div>
                <div>
                  <label>Time Slot</label>
                  <select name="timeSlot">
                    <option value="Morning (8 - 11 AM)">Morning (8 - 11 AM)</option>
                    <option value="Afternoon (12 - 4 PM)">Afternoon (12 - 4 PM)</option>
                    <option value="Evening (5 - 9 PM)">Evening (5 - 9 PM)</option>
                    <option value="Night (9 - 11 PM)">Night (9 - 11 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label>Reservation Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label>Special Requests (Optional)</label>
                <input type="text" placeholder="e.g. Window seat preferred" />
              </div>

              <button type="submit" className="cafe-btn primary-btn full-width mt-3">
                Confirm Reservation ☕
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MY BOOKINGS PASSES MODAL */}
      {myBookingsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button
              onClick={() => setMyBookingsModalOpen(false)}
              className="modal-close-btn text-dark"
            >
              ✕
            </button>

            <span className="page-tag">Passes & Reservations</span>
            <h2>My Active Bookings</h2>

            <div className="bookings-scroll-area">
              {bookings.length > 0 ? (
                bookings.map((bk) => (
                  <div key={bk.id} className="booking-pass-card">
                    <div className="pass-header">
                      <div>
                        <span className="pass-tag">Confirmed Pass</span>
                        <h4>{bk.cafeName}</h4>
                        <p>📍 {bk.location}</p>
                      </div>
                      <button
                        onClick={() => {
                          setBookings(bookings.filter((item) => item.id !== bk.id));
                          showToast("Reservation cancelled");
                        }}
                        className="cancel-pass-btn"
                      >
                        Cancel Pass
                      </button>
                    </div>

                    <div className="pass-footer">
                      <div>
                        <small>Guest Name</small>
                        <strong>{bk.name} ({bk.guests})</strong>
                      </div>
                      <div>
                        <small>Date & Time</small>
                        <strong className="brown-text">{bk.date}</strong>
                        <span className="block-sm">{bk.timeSlot}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-bookings">
                  <span className="big-emoji">🎟️</span>
                  <p>No active table reservations yet.</p>
                  <small>Reserve a table at any cafe to view your pass here!</small>
                </div>
              )}
            </div>

            <div className="modal-bottom-close">
              <button
                onClick={() => setMyBookingsModalOpen(false)}
                className="cafe-btn secondary-btn full-width"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-icon sm">☕</div>
            <h3>
              Cafe<span>Bite</span>
            </h3>
          </div>

          <div className="footer-links">
            <button onClick={() => setActiveTab("home")}>Home</button>
            <button onClick={() => setActiveTab("cafes")}>Cafes</button>
            <button onClick={() => setActiveTab("favorites")}>Wishlist</button>
            <button onClick={() => setActiveTab("about")}>About</button>
            <button onClick={() => setActiveTab("contact")}>Contact</button>
          </div>

          <p className="footer-copy">
            © 2026 CafeBite. All rights reserved. Crafted with ☕ & passion.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
