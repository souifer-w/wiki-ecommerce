import { Link } from "react-router-dom";
import "../home/HomePage.css";
export function Footer() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,0,0,0"
        rel="stylesheet"
      />
      <footer className="footer">
        <div className="cod-banner">
          <strong> 100% CASH ON DELIVERY </strong>

          <span> Inspect your order before you pay. </span>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">WIKI</div>

            <p>
              Premium men's fashion built around quality, simplicity and
              confidence. Designed for modern Morocco.
            </p>
          </div>

          <div className="footer-column">
            <h4>SHOP</h4>

            <Link to="#products">New Arrivals</Link>
            <Link to="#categories">Categories</Link>
            <Link to="#">Best Sellers</Link>
            <Link to="#">Collections</Link>
          </div>

          <div className="footer-column">
            <h4>CUSTOMER CARE</h4>

            <Link to="#">Contact</Link>
            <Link to="#">Delivery</Link>
            <Link to="#">Returns</Link>
            <Link to="#">Size Guide</Link>
          </div>

          <div className="footer-column">
            <h4>CITIES SERVED IN MOROCCO</h4>

            <span>Casablanca</span>
            <span>Rabat</span>
            <span>Marrakech</span>
            <span>Tangier</span>
            <span>Agadir</span>
            <span>Fes / Meknes</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span> © 2026 WIKI. ALL RIGHTS RESERVED. </span>

          <div>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms</Link>
            <Link to="#">Moroccan Commercial Registry</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
