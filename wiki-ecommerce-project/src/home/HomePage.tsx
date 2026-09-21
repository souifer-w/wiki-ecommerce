import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { products } from "../backend/Products";
export function HomePage() {
  return (
    <>
      <title>WIKI — Men's Fashion</title>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />

      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,0,0,0"
        rel="stylesheet"
      />
      <Header />
      <main>
        <section className="hero">
          <img
            className="hero-background"
            src="/screen.png"
            alt="WIKI men's luxury fashion collection"
          />

          <div className="hero-overlay"></div>

          <div className="hero-content">
            <span className="eyebrow">AUTUMN / WINTER 2026 EDITION</span>

            <h1>
              STYLE THAT
              <br />
              <em>SPEAKS FOR YOU.</em>
            </h1>

            <p className="hero-description">
              Premium men's fashion, designed for everyday confidence.
              Architectural silhouettes crafted with heavyweight natural fibers,
              tailored for Morocco.
            </p>

            <div className="hero-buttons">
              <Link to="/collectionsPage" className="btn btn-black">
                SHOP NOW
                <span>→</span>
              </Link>

              <Link to="/collectionsPage" className="btn btn-white">
                EXPLORE COLLECTION
                <span>→</span>
              </Link>
            </div>

            <div className="trust-bar">
              <div>
                <strong>FREE DELIVERY</strong>
                <span>Across Morocco</span>
              </div>

              <div>
                <strong>CASH ON DELIVERY</strong>
                <span>Pay upon arrival</span>
              </div>

              <div>
                <strong>ZERO RISK</strong>
                <span>Inspect before paying</span>
              </div>
            </div>
          </div>

          <div className="hero-product-info">
            <span>COLLECTION N° 04</span>
            <strong>Structured Wool Overcoat</strong>
            <b>890 DH</b>
          </div>

          <div className="hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <div></div>
          </div>
        </section>

        <section className="section categories-section" id="categories">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SHOP BY CATEGORY</span>

              <h2>
                THE WIKI <em>EDIT</em>
              </h2>
            </div>

            <Link to="#products" className="text-link">
              VIEW ALL <span>→</span>
            </Link>
          </div>

          <div className="category-grid">
            {products.slice(0, 4).map((product, index) => {
              const image =
                product.colors[index % product.colors.length].images[0];

              return (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="category-card"
                >
                  <img src={image} alt={product.name} />

                  <div className="category-overlay">
                    <div className="category-content">
                      <span className="category-number">0{index + 1}</span>

                      <h3>{product.name}</h3>

                      <div className="category-bottom">
                        <span>From {product.price} DH</span>

                        <span className="category-arrow">↗</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="section products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                {" "}
                CASABLANCA DISPATCH • 24H ARRIVAL{" "}
              </span>

              <h2>
                NEW <em>ARRIVALS</em>
              </h2>
            </div>

            <Link to="#" className="text-Link">
              {" "}
              SHOP ALL →{" "}
            </Link>
          </div>

          <div className="products-grid">
            {products.slice(-4).map((product, index) => {
              const image =
                product.colors[index % product.colors.length].images[0];
              return (
                <>
                  <Link to="/products" className="product-card">
                    <img src={image} alt={product.name} />

                    <div className="product-info">
                      <div>
                        <h3>{product.name}</h3>
                      </div>

                      <strong> {product.price} DH </strong>
                    </div>

                    <div className="product-meta">
                      <span>
                        {
                          product.colors[index % product.colors.length].name
                        }{" "}
                      </span>

                      <button>
                        <img src="add_shopping_cart.png" alt="add-to-cart" />
                      </button>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </section>

        <section className="editorial" id="editorial">
          <div className="editorial-image">
            <img src="YOUR-EDITORIAL-IMAGE.jpg" alt="WIKI Essentials" />
          </div>

          <div className="editorial-content">
            <span className="eyebrow"> THE WIKI JOURNAL </span>

            <h2>
              THE <em>ESSENTIALS</em>
            </h2>

            <p>
              We believe great style isn't about having more. It's about having
              the right pieces. Timeless silhouettes, premium natural fabrics,
              and considered details made for the rhythm of modern Morocco.
            </p>

            <div className="stats">
              <div>
                <strong>100%</strong>
                <span>NATURAL FIBERS</span>
              </div>

              <div>
                <strong>48H</strong>
                <span>NATIONWIDE EXPRESS</span>
              </div>

              <div>
                <strong>COD</strong>
                <span>INSPECT BEFORE PAY</span>
              </div>
            </div>

            <Link to="#products" className="btn btn-black">
              SHOP THE COLLECTION
              <span>→</span>
            </Link>
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-heading centered">
            <div>
              <span className="eyebrow"> THE WIKI STANDARD </span>

              <h2>
                WHY <em>WIKI</em>
              </h2>
            </div>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-number"> 01 </span>

              <span className="material-symbols-outlined feature-icon">
                diamond
              </span>

              <h3>Premium Quality</h3>

              <p>
                Carefully selected fabrics and construction designed for
                everyday wear.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-number"> 02 </span>

              <span className="material-symbols-outlined feature-icon">
                {" "}
                person{" "}
              </span>

              <h3>Made for Men</h3>

              <p>
                Clean silhouettes and versatile pieces designed around modern
                men's wardrobes.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-number"> 03 </span>

              <span className="material-symbols-outlined feature-icon">
                payments
              </span>

              <h3>100% Cash on Delivery</h3>

              <p>Order online and pay when your package arrives.</p>
            </div>

            <div className="feature-card">
              <span className="feature-number"> 04 </span>

              <span className="material-symbols-outlined feature-icon">
                local_shipping
              </span>

              <h3>Delivery Across Morocco</h3>

              <p>Fast delivery options covering major Moroccan cities.</p>
            </div>
          </div>

          <div className="delivery-grid">
            <div>
              <strong>CASABLANCA</strong>
              <span>SAME DAY</span>
            </div>

            <div>
              <strong>RABAT / SALÉ</strong>
              <span>24H</span>
            </div>

            <div>
              <strong>MARRAKECH</strong>
              <span>24H</span>
            </div>

            <div>
              <strong>TANGIER</strong>
              <span>24H</span>
            </div>

            <div>
              <strong>AGADIR</strong>
              <span>48H</span>
            </div>

            <div>
              <strong>FES / MEKNES</strong>
              <span>48H</span>
            </div>
          </div>
        </section>

        <section className="newsletter">
          <span className="eyebrow"> PRIVATE CIRCLE </span>

          <h2>
            STAY IN THE <em>WIKI WORLD</em>
          </h2>

          <p>
            Be the first to discover new capsules, private drops and seasonal
            access.
          </p>

          <form className="newsletter-form">
            <input type="email" placeholder="YOUR EMAIL ADDRESS" required />

            <button type="submit">JOIN THE CIRCLE →</button>
          </form>

          <small>
            No spam • Exclusive seasonal access • Unsubscribe at any moment
          </small>
        </section>
      </main>
      <Footer />
    </>
  );
}
