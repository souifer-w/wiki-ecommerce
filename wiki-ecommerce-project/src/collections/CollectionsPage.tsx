import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { products } from "../backend/Products";
import "./CollectionsPage.css";

export function CollectionsPage() {
  return (
    <>
      <title>WIKI — Men's Collection</title>

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
        <section className="collection-hero">
          <div className="collection-hero-content">
            <span className="eyebrow">THE WIKI COLLECTION</span>

            <h1>
              MEN'S
              <br />
              <em>COLLECTION</em>
            </h1>

            <p>
              Contemporary essentials, refined silhouettes and timeless pieces
              designed for the modern Moroccan man.
            </p>
          </div>

          <div className="collection-hero-number">
            <span>COLLECTION</span>
            <strong>2026</strong>
          </div>
        </section>

        <section className="collection-toolbar">
          <div className="collection-count">
            <span>THE WIKI COLLECTION</span>
            <strong>{products.length} PRODUCTS</strong>
          </div>
        </section>

        <section className="collection-products">
          <div className="collection-grid">
            {products.map((product, index) => {
              const color = product.colors[index % product.colors.length];

              const image = color.images[0];

              return (
                <article className="collection-product" key={product.id}>
                  <Link
                    to={`/productDetails/${product.id}`}
                    className="collection-image-wrap"
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className="collection-product-image"
                    />

                    <span className="product-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="collection-view">
                      VIEW PRODUCT
                      <span>↗</span>
                    </span>
                  </Link>

                  <div className="collection-product-info">
                    <div className="collection-product-heading">
                      <div>
                        <span className="collection-category">
                          {color.name}
                        </span>

                        <h2>{product.name}</h2>
                      </div>

                      <strong>{product.price} DH</strong>
                    </div>

                    <div className="collection-product-bottom">
                      <div className="color-list">
                        {product.colors.map((productColor) => (
                          <span
                            key={productColor.name}
                            className="color-dot"
                            title={productColor.name}
                          ></span>
                        ))}
                      </div>

                      <button
                        className="collection-cart"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                      >
                        <span className="material-symbols-outlined">
                          shopping_bag
                        </span>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="collection-editorial">
          <div className="editorial-copy">
            <span className="eyebrow">THE WIKI STANDARD</span>

            <h2>
              LESS
              <br />
              <em>BUT BETTER.</em>
            </h2>

            <p>
              A considered collection of pieces designed to work together.
              Premium fabrics, clean silhouettes and effortless everyday
              styling.
            </p>

            <Link to="/collectionsPage" className="editorial-button">
              EXPLORE THE COLLECTION
              <span>→</span>
            </Link>
          </div>

          <div className="editorial-mark">
            <span>W</span>
            <small>WIKI / 2026</small>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
