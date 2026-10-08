import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomePage.css";

import type { CartItem, Product } from "../backend/Products";

gsap.registerPlugin(ScrollTrigger);

type HomePageProps = {
  cart: CartItem[];
  products: Product[];
};

// Main HomePage component
export function HomePage({ cart, products }: HomePageProps) {
  // Controls the loading/skeleton state of the products
  const [isLoading, setIsLoading] = useState(true);

  // Reference to the HomePage container used by GSAP
  const homeRef = useRef<HTMLElement | null>(null);

  // Waits for products to load before removing the skeleton screen
  useEffect(() => {
    if (products.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [products]);

  // Creates the number of skeleton product cards displayed while loading
  const skeletons = Array.from({ length: 8 });

  // Creates and controls all GSAP and ScrollTrigger animations
  useLayoutEffect(() => {
    if (isLoading) return;

    // Creates a GSAP context to safely manage and clean up animations
    const ctx = gsap.context(() => {
      // Timeline controlling the hero entrance animations
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      // Hero entrance animation sequence
      heroTimeline
        .from(".modern-hero-image", {
          scale: 1.12,
          duration: 1.8,
          ease: "power3.out",
        })
        .from(
          ".modern-hero-overlay",
          {
            opacity: 0,
            duration: 1.2,
          },
          "-=1.2",
        )
        .from(
          ".modern-hero-watermark",
          {
            opacity: 0,
            y: 80,
            duration: 1.2,
          },
          "-=0.9",
        )
        .from(
          ".modern-hero-label",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.7",
        )
        .from(
          ".modern-hero-content h1",
          {
            opacity: 0,
            y: 70,
            duration: 1,
          },
          "-=0.45",
        )
        .from(
          ".modern-hero-content p",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".modern-hero-button",
          {
            opacity: 0,
            y: 25,
            scale: 0.96,
            duration: 0.7,
          },
          "-=0.4",
        )
        .from(
          ".modern-hero-bottom",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3",
        );

      // Creates the parallax effect for the hero image while scrolling
      gsap.to(".modern-hero-image", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".modern-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Creates the parallax effect for the WIKI watermark
      gsap.to(".modern-hero-watermark", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".modern-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Animates the intro section label when it enters the viewport
      gsap.from(".modern-intro-label", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".modern-intro",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animates the intro heading when it enters the viewport
      gsap.from(".modern-intro-content h2", {
        opacity: 0,
        y: 80,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".modern-intro-content",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Animates the intro paragraph
      gsap.from(".modern-intro-content p", {
        opacity: 0,
        y: 35,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".modern-intro-content",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Animates the intro link
      gsap.from(".modern-intro-content a", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".modern-intro-content",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Animates all section headers when they enter the viewport
      gsap.utils
        .toArray<HTMLElement>(".modern-section-header")
        .forEach((header) => {
          // Animates an individual section header
          gsap.from(header, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

      // Animates product cards with a staggered entrance
      gsap.from(".modern-product-card", {
        opacity: 0,
        y: 80,
        scale: 0.96,
        duration: 0.9,
        stagger: {
          amount: 0.7,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".modern-products-grid",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Adds a subtle parallax effect to each product image
      gsap.utils
        .toArray<HTMLElement>(".modern-product-image img")
        .forEach((image) => {
          // Animates the product image based on scroll position
          gsap.fromTo(
            image,
            {
              yPercent: -4,
            },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

      // Animates category items from left to right
      gsap.from(".modern-category-item", {
        opacity: 0,
        x: -80,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".modern-category-list",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animates category numbers separately
      gsap.from(".modern-category-item > span", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".modern-category-list",
          start: "top 80%",
        },
      });

      // Animates the WIKI Standard heading
      gsap.from(".modern-standard-heading", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".modern-standard",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animates WIKI Standard cards with a staggered effect
      gsap.from(".modern-standard-card", {
        opacity: 0,
        y: 70,
        scale: 0.94,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".modern-standard-grid",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Animates the newsletter section number
      gsap.from(".modern-newsletter-number", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".modern-newsletter",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animates newsletter content elements with a stagger
      gsap.from(".modern-newsletter-content > *", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".modern-newsletter-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Recalculates ScrollTrigger positions after the page is rendered
      ScrollTrigger.refresh();
    }, homeRef);

    // Removes all GSAP animations when the component is unmounted
    return () => {
      ctx.revert();
    };
  }, [isLoading]);
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

      <Header cart={cart} />

      <main ref={homeRef} className="wiki-home">
        <section className="modern-hero">
          <img
            className="modern-hero-image"
            src="/screen.png"
            alt="WIKI men's fashion collection"
          />

          <div className="modern-hero-overlay"></div>

          <div className="modern-hero-watermark">WIKI</div>

          <div className="modern-hero-content">
            <span className="modern-hero-label">AUTUMN / WINTER 2026</span>

            <h1>
              MADE
              <br />
              <em>FOR NOW.</em>
            </h1>

            <p>
              Contemporary menswear designed around confidence, simplicity and
              movement.
            </p>

            <Link to="/collectionsPage" className="modern-hero-button">
              <span>SHOP THE COLLECTION</span>
              <b>↗</b>
            </Link>
          </div>

          <div className="modern-hero-bottom">
            <span>01</span>

            <div className="modern-hero-progress">
              <span></span>
            </div>

            <span>04</span>
          </div>
        </section>

        <section className="modern-intro">
          <div className="modern-intro-label">
            <span>01</span>
            <span>THE WIKI COLLECTION</span>
          </div>

          <div className="modern-intro-content">
            <h2>
              LESS
              <br />
              <em>BUT BETTER.</em>
            </h2>

            <p>
              A considered collection of modern essentials. Clean silhouettes,
              neutral tones and timeless pieces designed to move with you.
            </p>

            <Link to="/collectionsPage">
              EXPLORE ALL
              <span>↗</span>
            </Link>
          </div>
        </section>

        <section className="modern-products-section">
          <div className="modern-section-header">
            <div>
              <span>02 / NEW SEASON</span>

              <h2>
                NEW <em>ARRIVALS</em>
              </h2>
            </div>

            <Link to="/collectionsPage">
              VIEW ALL
              <span>↗</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="modern-products-grid">
              {skeletons.map((_, index) => (
                <div
                  key={index}
                  className="modern-product-card modern-product-skeleton"
                >
                  <div className="modern-product-image skeleton-image">
                    <div className="home-skeleton-shimmer"></div>

                    <span className="modern-product-number">0{index + 1}</span>
                  </div>

                  <div className="modern-product-info">
                    <div>
                      <span className="home-skeleton-line skeleton-category"></span>

                      <span className="home-skeleton-line skeleton-title"></span>
                    </div>

                    <span className="home-skeleton-line skeleton-price"></span>
                  </div>

                  <div className="modern-product-meta">
                    <div className="home-skeleton-color"></div>

                    <span className="home-skeleton-line skeleton-colors-count"></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="modern-products-grid">
              {products.slice(-8).map((product, index) => {
                const color = product.colors[index % product.colors.length];

                const image = color.images[0];

                return (
                  <Link
                    key={product.id}
                    to={`/productDetails/${product.id}`}
                    className="modern-product-card"
                  >
                    <div className="modern-product-image">
                      <img src={image} alt={product.name} />

                      <span className="modern-product-number">
                        0{index + 1}
                      </span>

                      <span className="modern-product-new">NEW</span>

                      <span className="modern-product-view">
                        VIEW
                        <b>↗</b>
                      </span>
                    </div>

                    <div className="modern-product-info">
                      <div>
                        <span className="modern-product-category">
                          WIKI / MEN
                        </span>

                        <h3>{product.name}</h3>
                      </div>

                      <strong>{product.price} DH</strong>
                    </div>

                    <div className="modern-product-meta">
                      <div className="modern-color">
                        <span
                          style={{
                            backgroundColor: color.value,
                          }}
                        ></span>

                        {color.name}
                      </div>

                      <span>{product.colors.length} COLORS</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="modern-category-section">
          <div className="modern-section-header">
            <div>
              <span>04 / SHOP</span>

              <h2>
                FIND YOUR <em>STYLE.</em>
              </h2>
            </div>
          </div>

          <div className="modern-category-list">
            {[
              "T-SHIRTS",
              "SHIRTS",
              "HOODIES",
              "JACKETS",
              "TROUSERS",
              "JEANS",
            ].map((category, index) => (
              <Link
                key={category}
                to="/collectionsPage"
                className="modern-category-item"
              >
                <span>0{index + 1}</span>

                <h3>{category}</h3>

                <b>↗</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="modern-standard">
          <div className="modern-standard-heading">
            <span>05 / THE WIKI STANDARD</span>

            <h2>
              DESIGNED
              <br />
              <em>DIFFERENTLY.</em>
            </h2>
          </div>

          <div className="modern-standard-grid">
            <div className="modern-standard-card">
              <span>01</span>

              <div className="modern-standard-icon">
                <span className="material-symbols-outlined">diamond</span>
              </div>

              <h3>Premium Quality</h3>

              <p>
                Carefully selected fabrics and refined construction made for
                everyday wear.
              </p>
            </div>

            <div className="modern-standard-card">
              <span>02</span>

              <div className="modern-standard-icon">
                <span className="material-symbols-outlined">checkroom</span>
              </div>

              <h3>Modern Fits</h3>

              <p>
                Clean silhouettes designed around the contemporary men's
                wardrobe.
              </p>
            </div>

            <div className="modern-standard-card">
              <span>03</span>

              <div className="modern-standard-icon">
                <span className="material-symbols-outlined">payments</span>
              </div>

              <h3>Cash on Delivery</h3>

              <p>
                Order online and pay when your package arrives at your door.
              </p>
            </div>

            <div className="modern-standard-card">
              <span>04</span>

              <div className="modern-standard-icon">
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
              </div>

              <h3>Morocco Delivery</h3>

              <p>
                Fast delivery across Morocco with convenient delivery options.
              </p>
            </div>
          </div>
        </section>

        <section className="modern-newsletter">
          <div className="modern-newsletter-number">06</div>

          <div className="modern-newsletter-content">
            <span>THE WIKI PRIVATE CIRCLE</span>

            <h2>
              STAY IN THE
              <br />
              <em>WIKI WORLD.</em>
            </h2>

            <p>
              New collections, exclusive drops and seasonal releases — directly
              to your inbox.
            </p>

            <form className="modern-newsletter-form">
              <input type="email" placeholder="YOUR EMAIL ADDRESS" required />

              <button type="submit">
                JOIN
                <span>↗</span>
              </button>
            </form>

            <small>No spam · Unsubscribe anytime</small>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
