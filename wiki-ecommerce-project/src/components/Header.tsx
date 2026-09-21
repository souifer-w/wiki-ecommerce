import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
        rel="stylesheet"
      />
      <header className="site-header">
        <div className="announcement">
          FREE DELIVERY ACROSS MOROCCO
          <span>•</span>
          CASH ON DELIVERY (COD) ONLY
          <span>•</span>
          PAY UPON ARRIVAL
        </div>

        <div className="nav-container">
          <Link to="/" className="logo">
            <span>WIKI</span>
          </Link>

          <nav className="main-nav"></nav>

          <div className="nav-actions">
            <div className={`search-box ${searchOpen ? "active" : ""}`}>
              {searchOpen && (
                <input
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              )}

              <button
                className="icon-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <span className="material-symbols-outlined">
                  {searchOpen ? "close" : "search"}
                </span>
              </button>
            </div>

            <button className="currency-btn">MAD (DH)</button>

            <Link to="/cartPage">
              <button className="bag-btn">
                <span className="material-symbols-outlined">
                  {" "}
                  shopping_bag{" "}
                </span>
                <span>0</span>
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
