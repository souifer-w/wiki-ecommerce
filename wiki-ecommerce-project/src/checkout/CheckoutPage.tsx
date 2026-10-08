import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import gsap from "gsap";

import type { CartItem, OrderItem } from "../backend/Products";
import { saveOrder } from "../services/ordersService";
import "./CheckoutPage.css";

type CartPageProps = {
  cart: CartItem[];
  setOrders: Dispatch<SetStateAction<OrderItem[]>>;
  setCart: Dispatch<SetStateAction<CartItem[]>>;
};

export function CheckoutPage({ cart, setOrders, setCart }: CartPageProps) {
  // Navigation function used after successfully creating an order.
  const navigate = useNavigate();

  // Main checkout form reference used by GSAP animations.
  const checkoutPageRef = useRef<HTMLElement | null>(null);

  // Header section reference for the initial entrance animation.
  const checkoutHeaderRef = useRef<HTMLDivElement | null>(null);

  // Form reference used for staggered form animations.
  const checkoutFormRef = useRef<HTMLFormElement | null>(null);

  // Order summary reference used for the desktop slide-in animation.
  const orderSummaryRef = useRef<HTMLDivElement | null>(null);

  // Confirm button reference used for hover and entrance animations.
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  // Customer first name value.
  const [firstName, setFirstName] = useState("");

  // Customer last name value.
  const [lastName, setLastName] = useState("");

  // Customer Moroccan phone number.
  const [phone, setPhone] = useState("");

  // Optional customer email address.
  const [email, setEmail] = useState("");

  // Selected delivery city.
  const [city, setCity] = useState("");

  // Selected Moroccan region.
  const [region, setRegion] = useState("");

  // Customer street and neighborhood address.
  const [streetAddress, setStreetAddress] = useState("");

  // Prevents duplicate order submissions.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Displays an error message when order creation fails.
  const [message, setMessage] = useState("");

  // Calculates the total number of products in the cart.
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculates the complete cart price.
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Handles normal entrance and interaction animations for the checkout page.
  useEffect(() => {
    const page = checkoutPageRef.current;

    if (!page) {
      return;
    }

    // Creates an isolated GSAP context for this component.
    const context = gsap.context(() => {
      // Animates the main checkout header.
      gsap.from(".checkout-header", {
        opacity: 0,
        y: -20,
        duration: 0.7,
        ease: "power3.out",
      });

      // Animates the checkout form sections.
      gsap.from(".checkout-section", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        delay: 0.15,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Animates the order summary from the right.
      gsap.from(".order-summary", {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
      });

      // Animates the individual order products.
      gsap.from(".order-item", {
        opacity: 0,
        y: 12,
        duration: 0.45,
        delay: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });

      // Animates the order calculations.
      gsap.from(".calculations", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        delay: 0.65,
        ease: "power2.out",
      });

      // Animates the final order total.
      gsap.from(".total-row", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        delay: 0.75,
        ease: "power2.out",
      });

      // Animates the trust section.
      gsap.from(".trust-section", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        delay: 0.85,
        ease: "power2.out",
      });

      // Animates the confirmation button.
      gsap.from(confirmButtonRef.current, {
        opacity: 0,
        y: 10,
        scale: 0.98,
        duration: 0.6,
        delay: 0.9,
        ease: "power3.out",
      });

      // Adds a subtle hover animation to the confirmation button.
      const button = confirmButtonRef.current;

      if (button) {
        const handleMouseEnter = () => {
          if (button.disabled) {
            return;
          }

          gsap.to(button, {
            y: -2,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        // Returns the confirmation button to its normal position.
        const handleMouseLeave = () => {
          gsap.to(button, {
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        button.addEventListener("mouseenter", handleMouseEnter);

        button.addEventListener("mouseleave", handleMouseLeave);

        // Removes the button event listeners when the page unmounts.
        return () => {
          button.removeEventListener("mouseenter", handleMouseEnter);

          button.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, page);

    // Cleans up all GSAP animations when the component unmounts.
    return () => {
      context.revert();
    };
  }, []);

  // Handles form submission and saves the customer's order.
  const handleConfirmOrder = async () => {
    if (cart.length === 0 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    // Creates the order object sent to the order service.
    const newOrder: OrderItem = {
      id: `WK-${Date.now()}`,
      status: "Pending",
      customer: {
        name: `${firstName} ${lastName}`,
        phone,
        email,
        address: streetAddress,
        city,
      },
      items: [...cart],
      total: totalPrice,
      createdAt: new Date().toISOString(),
    };

    try {
      // Save the order to Firebase.
      await saveOrder(newOrder);

      // Add the newly created order to the local React state.
      setOrders((currentOrders) => {
        const updatedOrders = [...currentOrders, newOrder];

        return updatedOrders;
      });

      // Clear the shopping cart after successful order creation.
      setCart([]);

      // Navigate to the order confirmation page.
      navigate("/orderPage", {
        replace: true,
      });
    } catch {
      // Show an error message if Firebase/order creation fails.
      setMessage(
        "We could not save your order. Please check your connection and try again.",
      );

      // Allow the user to try again.
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <title>WIKI — Checkout</title>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />

      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <Header cart={cart} />

      <main ref={checkoutPageRef} className="checkout-page">
        <section className="checkout-container">
          <div ref={checkoutHeaderRef} className="checkout-header">
            <div className="header-left">
              <div className="breadcrumb">
                <Link to="/cartPage">Cart</Link>

                <span>/</span>

                <strong>Shipping Details</strong>

                <span>/</span>

                <span className="disabled">Payment Confirmation</span>
              </div>

              <h1>Checkout</h1>
            </div>

            <div className="shipping-notice">
              <span className="material-symbols-outlined">local_shipping</span>

              <p>Livraison Partout au Maroc — 24/48H Express</p>
            </div>
          </div>

          <div className="checkout-layout">
            <form
              ref={checkoutFormRef}
              id="checkout-form"
              className="checkout-form"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                void handleConfirmOrder();
              }}
            >
              {message && (
                <div className="checkout-message" role="alert">
                  <span className="material-symbols-outlined">error</span>

                  <p>{message}</p>
                </div>
              )}

              <section className="checkout-section">
                <div className="section-title">
                  <span className="section-number">01</span>

                  <h2>Customer Contact</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="first-name">
                      First Name <span className="required">*</span>
                    </label>

                    <input
                      id="first-name"
                      type="text"
                      placeholder="Amine"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="last-name">
                      Last Name <span className="required">*</span>
                    </label>

                    <input
                      id="last-name"
                      type="text"
                      placeholder="El Fassi"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone-number">
                    Moroccan Phone Number <span className="required">*</span>
                  </label>

                  <div className="phone-input">
                    <span className="country-code">🇲🇦 +212</span>

                    <input
                      id="phone-number"
                      type="tel"
                      placeholder="06 61 23 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-help">
                    <span className="material-symbols-outlined">chat</span>

                    <p>
                      Our Moroccan logistics team will call or WhatsApp this
                      number to confirm delivery before departure.
                    </p>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email-address">
                    Email Address{" "}
                    <span className="optional">
                      (for order receipt & tracking)
                    </span>
                  </label>

                  <input
                    id="email-address"
                    type="email"
                    placeholder="amine.elfassi@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </section>

              <section className="checkout-section">
                <div className="section-title">
                  <span className="section-number">02</span>

                  <h2>Delivery Address in Morocco</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="city">
                      City <span className="required">*</span>
                    </label>

                    <div className="select-wrapper">
                      <select
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select Moroccan City
                        </option>

                        <option value="Casablanca">Casablanca</option>

                        <option value="Marrakech">Marrakech</option>

                        <option value="Rabat">Rabat</option>

                        <option value="Tangier">Tangier (Tanger)</option>

                        <option value="Agadir">Agadir</option>

                        <option value="Fès">Fès</option>

                        <option value="Meknès">Meknès</option>

                        <option value="Oujda">Oujda</option>

                        <option value="Kénitra">Kénitra</option>

                        <option value="Tétouan">Tétouan</option>

                        <option value="Mohammedia">Mohammedia</option>
                      </select>

                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="region">
                      Region / Province <span className="required">*</span>
                    </label>

                    <div className="select-wrapper">
                      <select
                        id="region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select Region
                        </option>

                        <option value="Casablanca-Settat">
                          Casablanca-Settat
                        </option>

                        <option value="Rabat-Salé-Kénitra">
                          Rabat-Salé-Kénitra
                        </option>

                        <option value="Marrakech-Safi">Marrakech-Safi</option>

                        <option value="Tanger-Tétouan-Al Hoceïma">
                          Tanger-Tétouan-Al Hoceïma
                        </option>

                        <option value="Souss-Massa">Souss-Massa</option>

                        <option value="Fès-Meknès">Fès-Meknès</option>

                        <option value="L'Oriental">L'Oriental</option>
                      </select>

                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="street-address">
                    Street Address / Quartier / Neighborhood{" "}
                    <span className="required">*</span>
                  </label>

                  <input
                    id="street-address"
                    type="text"
                    placeholder="Boulevard d'Anfa, Quartier Racine, No. 42"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                  />
                </div>
              </section>
            </form>

            <aside className="order-column">
              <div ref={orderSummaryRef} className="order-summary">
                <div className="summary-header">
                  <h3>Order Summary</h3>

                  <span>{totalQuantity} Items</span>
                </div>

                <div className="order-items">
                  {cart.map((item) => (
                    <div
                      className="order-item"
                      key={`${item.id}-${item.selectColor}-${item.selectSize}`}
                    >
                      <div className="item-image">
                        <img src={item.selectImage} alt={item.name} />

                        <span>{item.quantity}x</span>
                      </div>

                      <div className="item-details">
                        <div>
                          <h4>{item.name}</h4>

                          <p>
                            {item.selectColor} • Size: {item.selectSize}
                          </p>
                        </div>

                        <strong>{item.price * item.quantity} DH</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="calculations">
                  <div className="calculation-row">
                    <span>Subtotal</span>

                    <strong>{totalPrice} DH</strong>
                  </div>

                  <div className="calculation-row">
                    <div className="shipping-label">
                      <span>Shipping to Morocco</span>

                      <small>Expédition Gratuite</small>
                    </div>

                    <strong>0 DH (FREE)</strong>
                  </div>
                </div>

                <div className="total-row">
                  <div>
                    <span>Total Due Upon Delivery</span>

                    <small>Montant à régler au livreur</small>
                  </div>

                  <strong>{totalPrice} DH</strong>
                </div>

                <button
                  ref={confirmButtonRef}
                  className="confirm-order-button"
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting
                      ? "Saving Order..."
                      : "Confirm Order (Pay on Delivery)"}
                  </span>

                  <span className="material-symbols-outlined">
                    {isSubmitting ? "progress_activity" : "arrow_forward"}
                  </span>
                </button>

                <div className="trust-section">
                  <div className="trust-grid">
                    <div className="trust-item">
                      <span className="material-symbols-outlined">lock</span>

                      <span>100% Zero Risk</span>
                    </div>

                    <div className="trust-item">
                      <span className="material-symbols-outlined">
                        local_shipping
                      </span>

                      <span>Direct COD Courier</span>
                    </div>

                    <div className="trust-item">
                      <span className="material-symbols-outlined">
                        support_agent
                      </span>

                      <span>VIP Support MA</span>
                    </div>
                  </div>

                  <p className="trust-description">
                    Cash collection managed via authorized national logistics
                    network across all 12 Moroccan regions.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
