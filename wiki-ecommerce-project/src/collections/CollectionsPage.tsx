import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CollectionsPage.css";
import type { CartItem, Product } from "../backend/Products";

// Registers ScrollTrigger so GSAP can control animations based on scroll position.
gsap.registerPlugin(ScrollTrigger);

type CartPageProps = {
  cart: CartItem[];
  products: Product[];
};

export function CollectionsPage({ cart, products }: CartPageProps) {
  // Reads the search query from the current URL.
  const [searchParams] = useSearchParams();

  // Controls the skeleton loading state before products are displayed.
  const [isLoading, setIsLoading] = useState(true);

  // Gives GSAP one parent element to scope all collection animations.
  const collectionRef = useRef<HTMLElement | null>(null);

  // Gets the product search value from the URL.
  const searchQuery = searchParams.get("search") || "";

  // Keeps the skeleton loader visible briefly while product data becomes available.
  useEffect(() => {
    if (products.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [products]);

  // Filters products according to the search query.
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Creates placeholder items for the skeleton grid.
  const skeletons = Array.from({ length: 8 });

  // Creates all GSAP animations after the real products are rendered.
  useLayoutEffect(() => {
    if (isLoading || !collectionRef.current) return;

    // Creates a GSAP context so every animation can be cleaned up together.
    const ctx = gsap.context(() => {
      // Controls the initial entrance animation of the collection hero.
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .from(".collection-hero-content .eyebrow", {
          y: 25,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".collection-hero-content h1",
          {
            y: 70,
            opacity: 0,
            duration: 1,
          },
          "-=0.4",
        )
        .from(
          ".collection-hero-content p",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".collection-hero-number",
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        );

      // Reveals the collection toolbar after the hero begins.
      gsap.from(".collection-toolbar", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.25,
      });

      // Reveals product cards with a small stagger when the grid enters the viewport.
      gsap.from(".collection-product", {
        scrollTrigger: {
          trigger: ".collection-products",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Adds a subtle parallax effect to product images while scrolling.
      gsap.utils
        .toArray<HTMLElement>(".collection-product-image")
        .forEach((image) => {
          gsap.fromTo(
            image,
            {
              y: -12,
              scale: 1.03,
            },
            {
              y: 12,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });

      // Reveals the editorial text from the left side.
      gsap.from(".editorial-copy", {
        scrollTrigger: {
          trigger: ".collection-editorial",
          start: "top 78%",
          toggleActions: "play none none none",
        },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Reveals the WIKI editorial mark from the right side.
      gsap.from(".editorial-mark", {
        scrollTrigger: {
          trigger: ".collection-editorial",
          start: "top 78%",
          toggleActions: "play none none none",
        },
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Gives the large W a slow vertical parallax movement.
      gsap.to(".editorial-mark span", {
        scrollTrigger: {
          trigger: ".collection-editorial",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -35,
        ease: "none",
      });

      // Recalculates ScrollTrigger positions after the page is rendered.
      ScrollTrigger.refresh();
    }, collectionRef);

    // Removes all GSAP animations and ScrollTriggers when the component changes.
    return () => ctx.revert();
  }, [isLoading]);

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

      <Header cart={cart} />

      <main ref={collectionRef}>
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
            <strong>
              {isLoading
                ? "LOADING PRODUCTS"
                : `${filteredProducts.length} PRODUCTS`}
            </strong>
          </div>
        </section>

        <section className="collection-products">
          {isLoading ? (
            <div className="collection-grid">
              {skeletons.map((_, index) => (
                <article
                  key={index}
                  className="collection-product collection-skeleton-card"
                >
                  <div className="collection-image-wrap skeleton-image">
                    <div className="skeleton-shimmer"></div>

                    <span className="skeleton-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="collection-product-info">
                    <div className="collection-product-heading">
                      <span className="skeleton-line skeleton-category"></span>
                      <span className="skeleton-line skeleton-title"></span>
                    </div>

                    <span className="skeleton-line skeleton-price"></span>
                  </div>

                  <div className="collection-product-bottom">
                    <div className="skeleton-colors">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="collection-grid">
              {filteredProducts.map((product, index) => {
                const color = product.colors[index % product.colors.length];

                const image = color.images[0];

                return (
                  <article key={product.id} className="collection-product">
                    <Link
                      to={`/productDetails/${product.id}`}
                      className="collection-image-wrap"
                    >
                      <img
                        className="collection-product-image"
                        src={image}
                        alt={product.name}
                      />

                      <span className="product-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="collection-view">
                        VIEW
                        <span>↗</span>
                      </span>
                    </Link>

                    <div className="collection-product-info">
                      <div className="collection-product-heading">
                        <span className="collection-category">WIKI / MEN</span>

                        <h2>{product.name}</h2>
                      </div>

                      <strong>{product.price} DH</strong>
                    </div>

                    <div className="collection-product-bottom">
                      <div className="color-list">
                        {product.colors.map((color) => (
                          <span
                            key={color.name}
                            className="color-dot"
                            style={{
                              backgroundColor: color.value,
                            }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
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
