import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import type { CartItem } from "../backend/Products";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CartPage.css";

type CartPageProps = {
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  cart: CartItem[];
};

export function CartPage({ cart, setCart }: CartPageProps) {
  // Reference for the main cart page.
  const cartPageRef = useRef<HTMLElement | null>(null);

  // Reference for the empty cart state.
  const emptyCartRef = useRef<HTMLDivElement | null>(null);

  // Reference for the breadcrumb section.
  const breadcrumbRef = useRef<HTMLElement | null>(null);

  // Reference for the cart heading.
  const cartHeadingRef = useRef<HTMLDivElement | null>(null);

  // Reference for the cart layout.
  const cartLayoutRef = useRef<HTMLDivElement | null>(null);

  // Reference for the cart items container.
  const cartItemsRef = useRef<HTMLDivElement | null>(null);

  // Reference for the cart right side.
  const cartRightRef = useRef<HTMLElement | null>(null);

  // Removes a specific product variant from the cart.
  const removeFromCart = (id: number, color: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectColor === color &&
            item.selectSize === size
          ),
      ),
    );
  };

  // Calculates the total number of products.
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculates the total cart price.
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Animates the empty cart state.
  useEffect(() => {
    if (!emptyCartRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(emptyCartRef.current, {
        opacity: 0,
        y: 35,
      });

      gsap.to(emptyCartRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".empty-icon", {
        scale: 0.7,
        opacity: 0,
        rotation: -8,
        duration: 0.8,
        delay: 0.15,
        ease: "back.out(1.7)",
      });

      gsap.from(".empty-cart h3", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".empty-cart p", {
        opacity: 0,
        y: 15,
        duration: 0.7,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".empty-cart a", {
        opacity: 0,
        y: 15,
        duration: 0.7,
        delay: 0.45,
        ease: "power3.out",
      });
    }, emptyCartRef);

    return () => ctx.revert();
  }, []);
  // Animates the main cart page when products exist.
  useEffect(() => {
    if (!cartPageRef.current || cart.length === 0) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(breadcrumbRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.6,
        })
        .from(
          cartHeadingRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.35",
        )
        .from(
          ".shipping-card",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.4",
        )
        .fromTo(
          ".cart-item",
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            clearProps: "opacity,transform",
          },
          "-=0.35",
        )
        .from(
          ".return-navigation",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.25",
        )
        .from(
          cartRightRef.current,
          {
            opacity: 0,
            x: 35,
            duration: 0.8,
          },
          "-=0.65",
        );
    }, cartPageRef);

    return () => ctx.revert();
  }, [cart.length]);

  // Animates the cart when its quantity or price changes.
  useEffect(() => {
    if (!cartPageRef.current || cart.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#cartHeaderTitle",
        {
          scale: 0.98,
          opacity: 0.7,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        "#summaryItemCount",
        {
          scale: 1.15,
        },
        {
          scale: 1,
          duration: 0.35,
          ease: "back.out(2)",
        },
      );

      gsap.fromTo(
        "#subtotalDisplay",
        {
          y: 5,
          opacity: 0.6,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        "#totalDisplay",
        {
          scale: 1.04,
          opacity: 0.7,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
      );
    }, cartPageRef);

    return () => ctx.revert();
  }, [totalQuantity, totalPrice, cart.length]);

  if (cart.length === 0) {
    return (
      <>
        <title>WIKI — Your Bag</title>

        <Header cart={cart} />

        <main className="cart-page" ref={cartPageRef}>
          <div className="empty-cart" id="cartEmptyState" ref={emptyCartRef}>
            <div className="empty-icon">
              <span className="material-symbols-outlined">shopping_bag</span>
            </div>

            <h3>YOUR BAG IS CURRENTLY EMPTY</h3>

            <p>
              Explore our tailored modern essentials crafted with heavyweight
              textiles for effortless everyday refinement.
            </p>

            <Link to="/collectionsPage">EXPLORE COLLECTION</Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <title>WIKI — Shopping Cart</title>

      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
        rel="stylesheet"
      />

      <Header cart={cart} />

      <main className="main-content" ref={cartPageRef}>
        <section className="breadcrumb-section" ref={breadcrumbRef}>
          <div className="container breadcrumb-wrapper">
            <div className="breadcrumb">
              <Link to="#">HOME</Link>

              <span>/</span>

              <strong>BAG &amp; ORDER REVIEW</strong>
            </div>
          </div>
        </section>

        <section className="cart-section">
          <div className="container">
            <div className="cart-heading" ref={cartHeadingRef}>
              <div>
                <span className="locations">
                  RABAT • CASABLANCA • MARRAKECH • TANGIER
                </span>

                <h1 id="cartHeaderTitle">YOUR CART ({totalQuantity} ITEMS)</h1>
              </div>

              <div className="inspection-note">
                <span className="material-symbols-outlined">
                  {" "}
                  verified_user{" "}
                </span>

                <span> Complimentary Inspection Upon Delivery Included </span>
              </div>
            </div>

            <div className="cart-layout" ref={cartLayoutRef}>
              <div className="cart-left">
                <div className="shipping-card">
                  <div className="shipping-top">
                    <div className="shipping-title">
                      <span className="material-symbols-outlined">
                        local_shipping
                      </span>

                      <span> MOROCCO EXPRESS COD DISPATCH </span>
                    </div>

                    <strong> QUALIFIED FOR FREE DELIVERY </strong>
                  </div>

                  <div className="shipping-progress">
                    <div></div>
                  </div>

                  <p>
                    Your bag qualifies for free tracked door-to-door courier
                    shipping anywhere across Morocco.
                  </p>
                </div>

                <div
                  className="cart-items"
                  id="cartItemsList"
                  ref={cartItemsRef}
                >
                  {cart.map((item) => {
                    return (
                      <>
                        {" "}
                        <article className="cart-item">
                          <div className="product-image">
                            <img src={item.selectImage} alt={item.name} />
                          </div>

                          <div className="product-info">
                            <div>
                              <div className="product-header">
                                <div>
                                  <span className="product-category">
                                    OUTERWEAR • TAILORED CUT
                                  </span>

                                  <h2>{item.name}</h2>
                                </div>

                                <div className="product-price">
                                  <strong id="price-display-1">
                                    {" "}
                                    {item.price}DH{" "}
                                  </strong>
                                </div>
                              </div>

                              <div className="product-details">
                                <div>
                                  <span>Size:</span>
                                  <strong>{item.selectSize}</strong>
                                </div>

                                <div>
                                  <span>Color:</span>
                                  <i
                                    className="color-selected"
                                    style={{
                                      backgroundColor: item.selectColor,
                                    }}
                                  ></i>
                                  <strong>{item.selectColor}</strong>
                                </div>
                              </div>
                            </div>

                            <div className="product-controls">
                              <div className="quantity">
                                <button
                                  aria-label="Decrease quantity"
                                  onClick={() => {
                                    setCart((prev) =>
                                      prev.map((cartItem) =>
                                        cartItem.id === item.id
                                          ? {
                                              ...cartItem,
                                              quantity: Math.max(
                                                1,
                                                cartItem.quantity - 1,
                                              ),
                                            }
                                          : cartItem,
                                      ),
                                    );
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    remove
                                  </span>
                                </button>

                                <span id="qty-val-1"> {item.quantity} </span>

                                <button
                                  aria-label="Increase quantity"
                                  onClick={() => {
                                    setCart((prev) =>
                                      prev.map((cartItem) =>
                                        cartItem.id === item.id
                                          ? {
                                              ...cartItem,
                                              quantity: cartItem.quantity + 1,
                                            }
                                          : cartItem,
                                      ),
                                    );
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    {" "}
                                    add{" "}
                                  </span>
                                </button>
                              </div>

                              <div className="product-actions">
                                <button
                                  className="remove-button"
                                  onClick={() => {
                                    removeFromCart(
                                      item.id,
                                      item.selectColor,
                                      item.selectSize,
                                    );
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    delete_outline
                                  </span>

                                  <span> Remove </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      </>
                    );
                  })}
                </div>

                <div className="return-navigation">
                  <Link to="#">
                    <span className="material-symbols-outlined">
                      arrow_left_alt
                    </span>
                    CONTINUE SHOPPING
                  </Link>

                  <span> PRICES VAT INCLUDED • CONCIERGE ASSISTANCE 7D/7 </span>
                </div>
              </div>

              <aside className="cart-right" ref={cartRightRef}>
                <div className="summary-card">
                  <div className="summary-heading">
                    <h2>ORDER SUMMARY</h2>

                    <span> CASH ON DELIVERY </span>
                  </div>

                  <div className="summary-rows">
                    <div className="summary-row">
                      <span>
                        Subtotal (
                        <span id="summaryItemCount">{totalQuantity}</span>{" "}
                        items)
                      </span>

                      <strong id="subtotalDisplay"> {totalPrice}DH </strong>
                    </div>

                    <div className="summary-row">
                      <span className="delivery-label">
                        Moroccan Delivery
                        <span
                          className="material-symbols-outlined"
                          title="24-48h nationwide dispatch"
                        >
                          help_outline
                        </span>
                      </span>

                      <div>
                        <del>40 DH</del>

                        <strong> FREE </strong>
                      </div>
                    </div>

                    <div className="summary-row">
                      <span> Inspection Assurance Guarantee </span>

                      <strong> FREE </strong>
                    </div>
                  </div>

                  <div className="promo-section">
                    <button className="promo-toggle">
                      <span>
                        <span className="material-symbols-outlined">
                          {" "}
                          sell{" "}
                        </span>
                        ENTER VOUCHER OR VIP PROMO
                      </span>

                      <span
                        className="material-symbols-outlined"
                        id="promoChevron"
                      >
                        expand_more
                      </span>
                    </button>

                    <div
                      className="promo-container hidden"
                      id="promoInputContainer"
                    >
                      <div className="promo-input">
                        <input
                          id="voucherCode"
                          type="text"
                          placeholder="e.g. CASAVIP10"
                        />

                        <button>APPLY</button>
                      </div>

                      <p id="promoMessage" className="hidden"></p>
                    </div>
                  </div>

                  <div className="total-box">
                    <div>
                      <span> ESTIMATED TOTAL </span>

                      <small> PAYABLE AT RECEPTION </small>
                    </div>

                    <strong id="totalDisplay"> {totalPrice} DH </strong>

                    <p>All prices in Moroccan Dirhams (MAD / DH)</p>
                  </div>

                  <Link to={"/checkoutPage"}>
                    <button className="checkout-button">
                      <span> PROCEED TO CHECKOUT </span>

                      <span className="material-symbols-outlined">
                        arrow_right_alt
                      </span>
                    </button>
                  </Link>

                  <div className="shipping-note">
                    <span className="material-symbols-outlined">
                      {" "}
                      schedule{" "}
                    </span>

                    <span> Orders Placed Before 3:00 PM Ship Same Day </span>
                  </div>
                </div>

                <div className="cod-card">
                  <div className="cod-heading">
                    <div className="cod-icon">
                      <span className="material-symbols-outlined">
                        {" "}
                        payments{" "}
                      </span>
                    </div>

                    <div>
                      <h3>CASH ON DELIVERY (COD) PAYMENT</h3>

                      <span> PAIEMENT À LA LIVRAISON PARTOUT AU MAROC </span>
                    </div>
                  </div>

                  <p>
                    No online credit card needed. Pay cash directly to the
                    courier when your order arrives at your door anywhere in
                    Morocco.
                  </p>

                  <div className="cod-features">
                    <div>
                      <span className="material-symbols-outlined">
                        {" "}
                        visibility{" "}
                      </span>

                      <span> Open &amp; Inspect First </span>
                    </div>

                    <div>
                      <span className="material-symbols-outlined">
                        {" "}
                        autorenew{" "}
                      </span>

                      <span> Simple 7-Day Exchange </span>
                    </div>
                  </div>
                </div>

                <div className="concierge-card">
                  <div className="concierge-info">
                    <span className="material-symbols-outlined"> chat </span>

                    <div>
                      <strong> NEED SIZING ADVICE? </strong>

                      <span> Chat live with our Moroccan styler </span>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WHATSAPP
                    <span className="material-symbols-outlined">
                      {" "}
                      open_in_new{" "}
                    </span>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <div className="checkout-notice" id="checkoutNotice">
        <span className="material-symbols-outlined"> check_circle </span>

        <div>
          <strong id="noticeTitle"> CART UPDATED </strong>

          <p id="noticeDesc">
            Calculation refreshed with Cash on Delivery guarantee.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
