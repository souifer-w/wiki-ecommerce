import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link, useParams } from "react-router-dom";
import "./ProductDetailsPage.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Product, CartItem } from "../backend/Products";
import type { Dispatch, SetStateAction } from "react";

type ProductDetailsPageProps = {
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  products: Product[];
  cart: CartItem[];
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export function ProductDetailsPage({
  setCart,
  cart,
  quantity,
  products,
  setQuantity,
}: ProductDetailsPageProps) {
  // Get the product ID from the current URL.
  const { id } = useParams();

  // Find the current product from the products array.
  const product = products.find((product) => product.id === Number(id));

  // Controls the product loading state.
  const [isLoading, setIsLoading] = useState(true);

  // Stores the currently selected product color.
  const [selectColor, setSelectColor] = useState(product?.colors[0]);

  // Controls the zoom overlay visibility.
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Stores the currently selected product image.
  const [selectImage, setSelecImage] = useState(product?.colors[0]?.images[0]);

  // Stores the currently selected product size.
  const [selectSize, setSelectSize] = useState(product?.sizes[0]);

  // Controls the "ADDED TO CART" message.
  const [addedToCart, setAddedToCart] = useState(false);

  // Main page reference used by GSAP.
  const productPageRef = useRef<HTMLElement | null>(null);

  // Main product image reference used for image transitions.
  const mainImageRef = useRef<HTMLImageElement | null>(null);

  // Add-to-cart button reference used for click animations.
  const addCartButtonRef = useRef<HTMLButtonElement | null>(null);

  // Zoom overlay reference used for opening and closing animations.
  const zoomOverlayRef = useRef<HTMLDivElement | null>(null);

  // Initializes the product and creates the small loading delay.
  useEffect(() => {
    if (!product) {
      setIsLoading(true);
      return;
    }

    const timer = setTimeout(() => {
      setSelectColor(product.colors[0]);
      setSelecImage(product.colors[0]?.images[0]);
      setSelectSize(product.sizes[0]);
      setQuantity(1);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [product, setQuantity]);

  // Creates the main entrance animation when the product page loads.
  useEffect(() => {
    if (isLoading || !product || !productPageRef.current) return;

    const ctx = gsap.context(() => {
      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      introTimeline
        .from(".trust-ribbon", {
          y: -20,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".breadcrumb",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".product-gallery",
          {
            x: -35,
            opacity: 0,
            duration: 1,
          },
          "-=0.35",
        )
        .from(
          ".product-information",
          {
            x: 35,
            opacity: 0,
            duration: 1,
          },
          "<",
        )
        .from(
          ".thumbnail",
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.55",
        )
        .from(
          ".product-intro > *",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.6",
        )
        .from(
          ".price-card",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".cod-information",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".selector-section",
          {
            y: 18,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.4",
        )
        .from(
          ".purchase-section",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35",
        )
        .from(
          ".guarantee-item",
          {
            y: 15,
            opacity: 0,
            stagger: 0.08,
            duration: 0.45,
          },
          "-=0.4",
        )
        .from(
          ".accordions details",
          {
            y: 12,
            opacity: 0,
            stagger: 0.08,
            duration: 0.45,
          },
          "-=0.3",
        )
        .from(
          ".styling-heading",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.2",
        )
        .from(
          ".styling-card",
          {
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
          },
          "-=0.4",
        )
        .from(
          ".philosophy-section > *",
          {
            y: 25,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
          },
          "-=0.3",
        );
    }, productPageRef);

    return () => ctx.revert();
  }, [isLoading, product]);

  // Animates the main image whenever the selected image changes.
  useEffect(() => {
    if (!mainImageRef.current || isLoading) return;

    gsap.fromTo(
      mainImageRef.current,
      {
        opacity: 0,
        scale: 1.035,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
      },
    );
  }, [selectImage, isLoading]);

  // Animates the zoom overlay when it opens or closes.
  useEffect(() => {
    if (!zoomOverlayRef.current) return;

    if (isZoomOpen) {
      gsap.set(zoomOverlayRef.current, {
        display: "flex",
      });

      gsap.fromTo(
        zoomOverlayRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        ".zoom-container",
        {
          opacity: 0,
          scale: 0.92,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(zoomOverlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (zoomOverlayRef.current) {
            gsap.set(zoomOverlayRef.current, {
              display: "none",
            });
          }
        },
      });
    }
  }, [isZoomOpen]);

  // Adds a product to the cart using the selected color, size and image.
  const addToCart = (product: Product) => {
    if (!selectColor || !selectSize || !selectImage) return;

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) =>
          item.id === product.id &&
          item.selectColor === selectColor.name &&
          item.selectSize === selectSize,
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id &&
          item.selectColor === selectColor.name &&
          item.selectSize === selectSize
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          selectColor: selectColor.name,
          selectSize: selectSize,
          selectImage: selectImage,
          quantity: quantity,
        },
      ];
    });
  };

  // Increases the selected product quantity.
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);

    if (addCartButtonRef.current) {
      gsap.fromTo(
        addCartButtonRef.current,
        {
          scale: 1,
        },
        {
          scale: 1.015,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
      );
    }
  };

  // Decreases the selected product quantity without going below one.
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));

    if (addCartButtonRef.current) {
      gsap.fromTo(
        addCartButtonRef.current,
        {
          scale: 1,
        },
        {
          scale: 0.985,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        },
      );
    }
  };

  // Animates the add-to-cart button after a successful cart action.
  const animateAddToCart = () => {
    if (!addCartButtonRef.current) return;

    gsap.killTweensOf(addCartButtonRef.current);

    gsap.fromTo(
      addCartButtonRef.current,
      {
        scale: 1,
      },
      {
        scale: 0.96,
        duration: 0.12,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.to(addCartButtonRef.current, {
            scale: 1,
            duration: 0.25,
            ease: "back.out(2)",
          });
        },
      },
    );
  };

  // Animates the thumbnail when the user selects another image.
  const handleImageSelect = (image: string) => {
    if (image === selectImage) return;

    if (mainImageRef.current) {
      gsap.to(mainImageRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setSelecImage(image);
        },
      });
    } else {
      setSelecImage(image);
    }
  };

  // Changes the selected color and automatically selects its first image.
  const handleColorSelect = (color: Product["colors"][number]) => {
    setSelectColor(color);
    handleImageSelect(color.images[0]);
  };

  // Handles the complete add-to-cart interaction.
  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    animateAddToCart();

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 1500);
  };

  if (isLoading || !product) {
    return (
      <div className="product-loading">
        <div className="product-loading-content">
          <div className="product-loading-logo">W</div>

          <div className="product-loading-spinner"></div>

          <p>LOADING PRODUCT</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>WIKI — {product.name}</title>

      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
        rel="stylesheet"
      />

      <Header cart={cart} />

      <main ref={productPageRef}>
        <div className="trust-ribbon">
          <div className="trust-container">
            <span>ATELIER CASABLANCA • SPRING / SUMMER '26 CAPSULE</span>

            <span className="trust-right">
              PAIEMENT À LA LIVRAISON DANS TOUT LE MAROC • DISPATCH 24H EXPRESS
            </span>
          </div>
        </div>

        <div className="page-container">
          <nav className="breadcrumb">
            <Link to="#"> HOME </Link>

            <span>/</span>

            <Link to="#"> OUTERWEAR </Link>

            <span>/</span>

            <Link to="#"> JACKETS </Link>

            <span>/</span>

            <span className="current">{product.name}</span>
          </nav>
        </div>

        <section className="product-section">
          <div className="product-layout">
            <div className="product-gallery">
              <div className="thumbnail-list">
                {selectColor?.images.map((image, index) => (
                  <Link
                    key={`${image}-${index}`}
                    to={`#image-${String(index + 1).padStart(2, "0")}`}
                    className={`thumbnail${
                      selectImage === image ? " active" : ""
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      handleImageSelect(image);
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                    />

                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </Link>
                ))}
              </div>

              <div className="main-product-image">
                <div className="image-slide" id="image-01">
                  <img
                    ref={mainImageRef}
                    src={selectImage}
                    alt={product.name}
                  />
                </div>

                <div className="image-number">
                  {String(
                    (selectColor?.images.findIndex(
                      (image) => image === selectImage,
                    ) ?? 0) + 1,
                  ).padStart(2, "0")}
                </div>

                <div
                  className="inspect-label"
                  onClick={() => setIsZoomOpen(true)}
                >
                  <span className="material-symbols-outlined">zoom_in</span>
                  INSPECT WEAVE
                </div>
              </div>

              {isZoomOpen && (
                <div
                  ref={zoomOverlayRef}
                  className="zoom-overlay"
                  onClick={() => setIsZoomOpen(false)}
                >
                  <div
                    className="zoom-container"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <img src={selectImage} alt={product.name} />

                    <button
                      className="zoom-close"
                      onClick={() => setIsZoomOpen(false)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="product-information">
              <div className="product-intro">
                <h1>{product.name}</h1>

                <p className="product-description">{product.description}</p>
              </div>

              <div className="price-card">
                <div className="price-top">
                  <div>
                    <span className="current-price">{product.price}DH</span>
                  </div>

                  <span className="tax">TVA INCLUSE</span>
                </div>

                <div className="product-badges">
                  <span>LIVRAISON GRATUITE MAROC</span>

                  <span>CONTRÔLE AVANT PAIEMENT</span>
                </div>
              </div>

              <div className="cod-information">
                <span className="material-symbols-outlined">payments</span>

                <div>
                  <strong>PAIEMENT 100% À LA LIVRAISON (COD)</strong>

                  <p>
                    Aucun paiement en ligne. Payez uniquement lorsque votre
                    commande arrive à votre adresse.
                  </p>
                </div>
              </div>

              <div className="selector-section">
                <div className="selector-heading">
                  <span>COLOR</span>

                  <strong>{selectColor?.name}</strong>
                </div>

                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`color-option ${
                        selectColor?.name === color.name ? "active" : ""
                      }`}
                      aria-label={color.name}
                      style={{
                        backgroundColor: color.value,
                      }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
              </div>

              <div className="selector-section">
                <div className="selector-heading">
                  <span>SIZE</span>

                  <Link to="#size-guide">SIZE GUIDE</Link>
                </div>

                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${
                        selectSize === size ? "active" : ""
                      }`}
                      onClick={() => setSelectSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="purchase-section">
                <div className="quantity">
                  <button type="button" onClick={decreaseQuantity}>
                    −
                  </button>

                  <span>{quantity}</span>

                  <button type="button" onClick={increaseQuantity}>
                    +
                  </button>
                </div>

                <button
                  ref={addCartButtonRef}
                  type="button"
                  className="add-cart"
                  aria-label="Add to Cart"
                  onClick={handleAddToCart}
                >
                  <span className="cart-hint">ADD TO CART</span>

                  {addedToCart && (
                    <span className="cart-added">ADDED TO CART</span>
                  )}
                </button>
              </div>

              <div className="guarantee">
                <div className="guarantee-item">
                  <span className="material-symbols-outlined">schedule</span>

                  <div>
                    <strong>24 / 48H</strong>

                    <span>Livraison express</span>
                  </div>
                </div>

                <div className="guarantee-item">
                  <span className="material-symbols-outlined">sync_alt</span>

                  <div>
                    <strong>ÉCHANGE GRATUIT</strong>

                    <span>Changement de taille</span>
                  </div>
                </div>

                <div className="guarantee-item">
                  <span className="material-symbols-outlined">chat</span>

                  <div>
                    <strong>WHATSAPP</strong>

                    <span>+212 6 00 00 00 00</span>
                  </div>
                </div>
              </div>

              <div className="accordions">
                <details open>
                  <summary>
                    <span>01 — CRAFTSMANSHIP & CUT</span>

                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </summary>

                  <div className="accordion-content">
                    <p>
                      Designed in Casablanca and produced with carefully
                      selected materials. The tailored bomber construction
                      combines a structured shoulder, clean front panel and
                      relaxed contemporary fit.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    <span>02 — COMPOSITION & CARE</span>

                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </summary>

                  <div className="accordion-content">
                    <p>Premium wool blend with a soft, structured finish.</p>

                    <ul>
                      <li>Do not bleach</li>

                      <li>Dry clean recommended</li>

                      <li>Iron at low temperature</li>

                      <li>Store on a wide hanger</li>
                    </ul>
                  </div>
                </details>

                <details>
                  <summary>
                    <span>03 — EXPÉDITION & PAIEMENT COD MAROC</span>

                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </summary>

                  <div className="accordion-content">
                    <p>
                      Nous livrons dans toutes les villes du Maroc. La commande
                      est expédiée sous 24 heures et le paiement est effectué
                      directement au livreur.
                    </p>

                    <p>
                      Vous pouvez contrôler votre article avant de procéder au
                      paiement.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        <section className="philosophy-section">
          <span className="eyebrow">PHILOSOPHIE DE L'HABIT</span>

          <blockquote>
            “Le vêtement ne doit pas parler plus fort que celui qui le porte.”
          </blockquote>

          <p>— STUDIO WIKI CASABLANCA</p>
        </section>

        <section className="size-guide" id="size-guide">
          <div className="size-guide-container">
            <div className="modal-heading">
              <div>
                <span className="eyebrow">WIKI FIT</span>

                <h2>SIZE GUIDE</h2>
              </div>

              <Link to="#" className="close-modal">
                <span className="material-symbols-outlined">close</span>
              </Link>
            </div>

            <p className="size-description">
              Toutes les mesures sont indiquées en centimètres. Pour un résultat
              précis, mesurez directement sur votre corps.
            </p>

            <div className="size-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>CHEST</th>
                    <th>SHOULDER</th>
                    <th>SLEEVE</th>
                    <th>LENGTH</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>104</td>
                    <td>46</td>
                    <td>64</td>
                    <td>62</td>
                  </tr>

                  <tr>
                    <td>S</td>
                    <td>108</td>
                    <td>48</td>
                    <td>65</td>
                    <td>63</td>
                  </tr>

                  <tr className="selected-size">
                    <td>M</td>
                    <td>112</td>
                    <td>50</td>
                    <td>66</td>
                    <td>64</td>
                  </tr>

                  <tr>
                    <td>L</td>
                    <td>116</td>
                    <td>52</td>
                    <td>68</td>
                    <td>65</td>
                  </tr>

                  <tr>
                    <td>XL</td>
                    <td>122</td>
                    <td>54</td>
                    <td>70</td>
                    <td>66</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Link to="#product" className="size-guide-button">
              COMPRIS, RETOUR AU PRODUIT
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
