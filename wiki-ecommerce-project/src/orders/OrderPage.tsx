import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import type { CartItem, OrderItem } from "../backend/Products";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./OrderPage.css";

type CartPageProps = {
  cart: CartItem[];
  orders: OrderItem[];
};

export function OrderPage({ cart, orders }: CartPageProps) {
  const navigate = useNavigate();

  // Reference for the main order page.
  const pageRef = useRef<HTMLElement | null>(null);

  // Reference for the status bar.
  const statusBarRef = useRef<HTMLDivElement | null>(null);

  // Reference for the main content container.
  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  // Reference for the confirmation section.
  const confirmationRef = useRef<HTMLElement | null>(null);

  // Reference for the order grid.
  const orderGridRef = useRef<HTMLElement | null>(null);

  // Reference for the products module.
  const productsModuleRef = useRef<HTMLDivElement | null>(null);

  // Reference for the right order ledger.
  const orderLedgerRef = useRef<HTMLDivElement | null>(null);

  // Reference for the footer note.
  const footerNoteRef = useRef<HTMLDivElement | null>(null);

  // Gets the most recent order.
  const latestOrder = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];

  // Animates the empty order state.
  useEffect(() => {
    if (latestOrder) return;

    const ctx = gsap.context(() => {
      gsap.from(".confirmation-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [latestOrder]);

  // Animates the complete order confirmation page.
  useEffect(() => {
    if (!latestOrder || !pageRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(statusBarRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.55,
        })
        .from(
          ".order-page-action",
          {
            opacity: 0,
            x: -20,
            duration: 0.5,
          },
          "-=0.25",
        )
        .from(
          ".success-icon-wrapper",
          {
            opacity: 0,
            scale: 0.65,
            rotation: -8,
            duration: 0.75,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )
        .from(
          ".eyebrow",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.35",
        )
        .from(
          ".confirmation-header h1",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.3",
        )
        .from(
          ".confirmation-text",
          {
            opacity: 0,
            y: 15,
            duration: 0.55,
          },
          "-=0.35",
        )
        .from(
          ".delivery-notice",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.3",
        )
        .from(
          ".products-module",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.35",
        )
        .from(
          ".product-item",
          {
            opacity: 0,
            y: 25,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.35",
        )
        .from(
          ".price-ledger",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3",
        )
        .from(
          ".inspection-callout",
          {
            opacity: 0,
            y: 20,
            duration: 0.55,
          },
          "-=0.25",
        )
        .from(
          orderLedgerRef.current,
          {
            opacity: 0,
            x: 35,
            duration: 0.75,
          },
          "-=0.65",
        )
        .from(
          footerNoteRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.25",
        );
    }, pageRef);

    return () => ctx.revert();
  }, [latestOrder]);

  // Adds a subtle animation to the success pulse.
  useEffect(() => {
    if (!latestOrder || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".success-pulse", {
        scale: 1.25,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [latestOrder]);

  if (!latestOrder) {
    return (
      <>
        <title>WIKI — No Order</title>

        <Header cart={cart} />

        <main className="page" ref={pageRef}>
          <div className="main-container">
            <section className="confirmation-header">
              <p className="eyebrow">NO ORDER FOUND</p>

              <h1>NO CONFIRMED ORDER</h1>

              <p className="confirmation-text">
                There is currently no confirmed order to display.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Formats the order creation date.
  const orderDate = new Date(latestOrder.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  // Calculates the total number of ordered products.
  const totalQuantity = latestOrder.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Gets the customer's name.
  const customerName = latestOrder.customer.name;

  // Gets the customer's phone number.
  const customerPhone = latestOrder.customer.phone;

  // Gets the customer's email.
  const customerEmail = latestOrder.customer.email;

  // Gets the customer's address.
  const customerAddress = latestOrder.customer.address;

  // Gets the customer's city.
  const customerCity = latestOrder.customer.city;

  return (
    <>
      <title>WIKI — Order Confirmed</title>

      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <Header cart={cart} />

      <main className="page" ref={pageRef}>
        <div className="status-bar" ref={statusBarRef}>
          <span>SARTORIAL HERITAGE — CASABLANCA / PARIS</span>

          <span className="status-shipping">
            EXPÉDITION EXPRESS NATIONALE 24/48H
          </span>

          <span>RÉF : {latestOrder.id}</span>
        </div>

        <div className="main-container" ref={mainContainerRef}>
          <div className="order-page-action">
            <button
              type="button"
              className="shop-back-button"
              onClick={() => navigate("/collectionsPage")}
            >
              <span className="material-symbols-outlined">arrow_back</span>

              <span>CONTINUE SHOPPING</span>
            </button>
          </div>

          <section className="confirmation-header" ref={confirmationRef}>
            <div className="success-icon-wrapper">
              <div className="success-pulse"></div>

              <div className="success-icon">
                <span className="material-symbols-outlined">check</span>
              </div>
            </div>

            <p className="eyebrow">ACQUISITION ENREGISTRÉE</p>

            <h1>ORDER CONFIRMED</h1>

            <p className="confirmation-text">
              Thank you for shopping with WIKI. Your order{" "}
              <strong>#{latestOrder.id}</strong> has been successfully logged
              into our atelier ledger.
            </p>

            <div className="delivery-notice">
              <div className="delivery-line"></div>

              <div className="delivery-content">
                <span className="material-symbols-outlined delivery-icon">
                  call
                </span>

                <div>
                  <div className="delivery-title">
                    <span>PROTOCOLE DE LIVRAISON MAROC</span>

                    <span className="delivery-dot"></span>

                    <span className="whatsapp-label">WHATSAPP DIRECT</span>
                  </div>

                  <p>
                    We will contact you via phone or WhatsApp (
                    <strong>{customerPhone}</strong>) to coordinate and confirm
                    your ideal delivery window before our private courier is
                    dispatched.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="order-grid" ref={orderGridRef}>
            <div className="left-column">
              <div className="products-module" ref={productsModuleRef}>
                <div className="module-header">
                  <h2>Acquisitions</h2>

                  <span className="eyebrow">
                    {totalQuantity} {totalQuantity === 1 ? "PIECE" : "PIECES"}{" "}
                    SELECTED
                  </span>
                </div>

                {latestOrder.items.map((item) => (
                  <article
                    className="product-item"
                    key={`${item.id}-${item.selectColor}-${item.selectSize}`}
                  >
                    <div className="product-image">
                      <img src={item.selectImage} alt={item.name} />
                    </div>

                    <div className="product-details">
                      <div>
                        <div className="product-title-row">
                          <h3>{item.name}</h3>

                          <span className="product-price">
                            {item.price * item.quantity} DH
                          </span>
                        </div>

                        <p className="product-meta">
                          {item.selectColor}
                          {" • "}
                          Size {item.selectSize}
                          {" • "}
                          Qty {item.quantity}
                          {item.quantity > 1 && (
                            <>
                              {" • "}({item.price} DH each)
                            </>
                          )}
                        </p>

                        <span className="product-tag">
                          WIKI Atelier Selection
                        </span>
                      </div>

                      <p className="product-reference">REF. {item.id}</p>
                    </div>
                  </article>
                ))}

                <div className="price-ledger">
                  <div className="ledger-row">
                    <span>Sous-total articles</span>

                    <strong>{latestOrder.total} DH</strong>
                  </div>

                  <div className="ledger-row">
                    <span className="shipping-label">
                      Expédition Nationale Express
                      {customerCity && ` (${customerCity})`}
                      <small>OFFERT</small>
                    </span>

                    <strong>0 DH</strong>
                  </div>

                  <div className="ledger-row">
                    <span>Frais de Paiement à la Livraison</span>

                    <strong>0 DH</strong>
                  </div>

                  <div className="ledger-total">
                    <div>
                      <span>Total à Régler</span>

                      <small>ESPÈCES À RÉCEPTION</small>
                    </div>

                    <div className="total-value">
                      <strong>{latestOrder.total} DH</strong>

                      <small>TVA INCLUSE</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inspection-callout">
                <span className="material-symbols-outlined">verified</span>

                <div>
                  <h4>GARANTIE D'INSPECTION À LA PORTE</h4>

                  <p>
                    Chez WIKI, vous conservez le droit d'ouvrir délicatement le
                    colis sous la supervision du livreur avant tout règlement en
                    numéraire. Essayage immédiat sur demande.
                  </p>
                </div>
              </div>
            </div>

            <div className="right-column">
              <div className="order-ledger" ref={orderLedgerRef}>
                <h2 className="module-title">BORDEREAU DE COMMANDE</h2>

                <dl className="order-details">
                  <div>
                    <dt>Numéro de Commande</dt>

                    <dd>#{latestOrder.id}</dd>
                  </div>

                  <div>
                    <dt>Date d'Enregistrement</dt>

                    <dd>{orderDate}</dd>
                  </div>

                  <div>
                    <dt>Mode de Paiement</dt>

                    <dd className="uppercase">Paiement à la Livraison (COD)</dd>
                  </div>

                  <div>
                    <dt>Montant Exigible</dt>

                    <dd className="bold">{latestOrder.total} DH</dd>
                  </div>
                </dl>

                <div className="destination">
                  <div className="destination-heading">
                    <span>ADRESSE DE DESTINATION</span>

                    <span className="material-symbols-outlined">
                      local_shipping
                    </span>
                  </div>

                  <div className="address-card">
                    <p className="customer-name">{customerName}</p>

                    <p className="address">
                      {customerAddress}
                      <br />
                      {customerCity}, Maroc
                    </p>

                    <div className="phone">
                      <span className="material-symbols-outlined">
                        phone_iphone
                      </span>

                      <span>{customerPhone}</span>
                    </div>

                    {customerEmail && (
                      <div className="phone">
                        <span className="material-symbols-outlined">mail</span>

                        <span>{customerEmail}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="footer-note" ref={footerNoteRef}>
            WIKI MAISON DE COUTURE MASCULINE
            {" • "}
            CASABLANCA
            {" • "}
            MAROC
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
