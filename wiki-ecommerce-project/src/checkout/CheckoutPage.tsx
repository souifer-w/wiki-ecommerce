import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import "./CheckoutPage.css";
export function CheckoutPage() {
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
      <Header />
      <main className="checkout-page">
        <section className="checkout-container">
          <div className="checkout-header">
            <div className="header-left">
              <div className="breadcrumb">
                <Link to="#"> Cart </Link>

                <span>/</span>

                <strong> Shipping Details </strong>

                <span>/</span>

                <span className="disabled"> Payment Confirmation </span>
              </div>

              <h1>Checkout</h1>
            </div>

            <div className="shipping-notice">
              <span className="material-symbols-outlined">
                {" "}
                local_shipping{" "}
              </span>

              <p>Livraison Partout au Maroc — 24/48H Express</p>
            </div>
          </div>

          <div className="checkout-layout">
            <div className="checkout-form">
              <section className="checkout-section">
                <div className="section-title">
                  <span className="section-number"> 01 </span>

                  <h2>Customer Contact</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="first-name">
                      First Name
                      <span className="required">*</span>
                    </label>

                    <input
                      id="first-name"
                      type="text"
                      placeholder="Amine"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="last-name">
                      Last Name
                      <span className="required">*</span>
                    </label>

                    <input
                      id="last-name"
                      type="text"
                      placeholder="El Fassi"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone-number">
                    Moroccan Phone Number
                    <span className="required">*</span>
                  </label>

                  <div className="phone-input">
                    <span className="country-code"> 🇲🇦 +212 </span>

                    <input
                      id="phone-number"
                      type="tel"
                      placeholder="06 61 23 45 67"
                      required
                    />
                  </div>

                  <div className="form-help">
                    <span className="material-symbols-outlined"> chat </span>

                    <p>
                      Our Moroccan logistics team will call or WhatsApp this
                      number to confirm delivery before departure.
                    </p>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email-address">
                    Email Address
                    <span className="optional">
                      {" "}
                      (for order receipt & tracking){" "}
                    </span>
                  </label>

                  <input
                    id="email-address"
                    type="email"
                    placeholder="amine.elfassi@gmail.com"
                  />
                </div>
              </section>

              <section className="checkout-section">
                <div className="section-title">
                  <span className="section-number"> 02 </span>

                  <h2>Delivery Address in Morocco</h2>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="city">
                      City
                      <span className="required">*</span>
                    </label>

                    <div className="select-wrapper">
                      <select id="city" required>
                        <option value="" selected disabled>
                          Select Moroccan City
                        </option>

                        <option value="casablanca">Casablanca</option>

                        <option value="marrakech">Marrakech</option>

                        <option value="rabat">Rabat</option>

                        <option value="tangier">Tangier (Tanger)</option>

                        <option value="agadir">Agadir</option>

                        <option value="fes">Fès</option>

                        <option value="meknes">Meknès</option>

                        <option value="oujda">Oujda</option>

                        <option value="kenitra">Kénitra</option>

                        <option value="tetouan">Tétouan</option>

                        <option value="mohammedia">Mohammedia</option>
                      </select>

                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="region">
                      Region / Province
                      <span className="required">*</span>
                    </label>

                    <div className="select-wrapper">
                      <select id="region" required>
                        <option value="" selected disabled>
                          Select Region
                        </option>

                        <option value="casablanca-settat">
                          Casablanca-Settat
                        </option>

                        <option value="rabat-sale-kenitra">
                          Rabat-Salé-Kénitra
                        </option>

                        <option value="marrakech-safi">Marrakech-Safi</option>

                        <option value="tanger-tetouan">
                          Tanger-Tétouan-Al Hoceïma
                        </option>

                        <option value="souss-massa">Souss-Massa</option>

                        <option value="fes-meknes">Fès-Meknès</option>

                        <option value="oriental">L'Oriental</option>
                      </select>

                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="street-address">
                    Street Address / Quartier / Neighborhood
                    <span className="required">*</span>
                  </label>

                  <input
                    id="street-address"
                    type="text"
                    placeholder="Boulevard d'Anfa, Quartier Racine, No. 42"
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="apartment">
                      Apartment / Floor / Residence
                      <span className="optional"> (Optional) </span>
                    </label>

                    <input
                      id="apartment"
                      type="text"
                      placeholder="Immeuble B, 3ème étage, Apt 14"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="postal-code">
                      Postal Code
                      <span className="optional"> (Optional) </span>
                    </label>

                    <input id="postal-code" type="text" placeholder="20050" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="delivery-note">
                    Delivery Instructions
                    <span className="optional"> (Optional) </span>
                  </label>

                  <textarea
                    id="delivery-note"
                    rows={3}
                    placeholder="e.g., Leave with concierge or call before arriving"
                  ></textarea>
                </div>
              </section>

              <section className="checkout-section">
                <div className="section-title">
                  <span className="section-number"> 03 </span>

                  <h2>Payment Method</h2>
                </div>

                <div className="payment-card">
                  <div className="payment-main">
                    <div className="payment-check">
                      <span className="material-symbols-outlined"> check </span>
                    </div>

                    <div className="payment-content">
                      <div className="payment-heading">
                        <span className="payment-title">
                          <span className="material-symbols-outlined">
                            {" "}
                            shield{" "}
                          </span>
                          Cash on Delivery (COD)
                        </span>

                        <span className="only-payment">
                          {" "}
                          Only Payment Method{" "}
                        </span>
                      </div>

                      <p className="payment-description">
                        Pay with cash directly to the courier upon delivery.
                        Please have the exact amount ready in Moroccan Dirhams
                        (DH).
                      </p>

                      <div className="payment-meta">
                        <span>
                          <span className="material-symbols-outlined">
                            payments
                          </span>
                          Paiement à la livraison
                        </span>

                        <span className="dot"> • </span>

                        <span> No online cards required </span>
                      </div>
                    </div>
                  </div>

                  <div className="inspection">
                    <span className="material-symbols-outlined">
                      {" "}
                      verified{" "}
                    </span>

                    <p>
                      <strong> Inspection Guarantee: </strong>
                      You can open and inspect your parcel before handing
                      payment to the Moroccan courier agent.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="order-column">
              <div className="order-summary">
                <div className="summary-header">
                  <h3>Order Summary</h3>

                  <span> 2 Items </span>
                </div>

                <div className="order-items">
                  <div className="order-item">
                    <div className="item-image">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCIL2G0l0XL3jSM_0IBzjV8-fQuq5tfaaQiu7nA4BQ9bOzTC9_KFSxS7BDVsVfacRAwP0fI2n_RJ_ae3KxsgQQUB1BlRNIDKtQwQIG-ExlNSnw2UTKXLwanu73ULCjMRw0ljHg8J8ATmADKfr28BrAvCH0XYWSjsLEh99szm9j6vxGuSyUtQq2OzVDUWvt0IogEeLqIJrAUhIQyF0z2Tin1VpbeBj24GhEqZyaUyia4-ZZayHIMHHsVg"
                        alt="Tailored Minimalist Wool Bomber"
                      />

                      <span> 1x </span>
                    </div>

                    <div className="item-details">
                      <div>
                        <h4>Tailored Minimalist Wool Bomber</h4>

                        <p>Noir Charcoal • Size: L</p>
                      </div>

                      <strong> 680 DH </strong>
                    </div>
                  </div>

                  <div className="order-item">
                    <div className="item-image">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ2kFTjN9EGApOBNvyiycpQEXSYyQ12v0aMequvnrDCfy0verqNk0Y53LypgTZpPCSXp_xL5cdzXapjlRYwzdZKoI891MSGhMb7dlO6rZSnFjTl2O_3w7LYx7626VFxh9sNqJyx5uTTOhNdDF7yjivqeBQaDpH_PSsgTAoKz31UmylrL0poCeUJ91OI5HGK5Wbaea7b-E_XlA2Q3TlhrS4EA_EpMUslCigmy24ftR_eCIu38GtYYHDww"
                        alt="Oversized Heavyweight Tee"
                      />

                      <span> 2x </span>
                    </div>

                    <div className="item-details">
                      <div>
                        <h4>Oversized Heavyweight Tee</h4>

                        <p>Off-White Ecru • Size: M</p>
                      </div>

                      <strong> 498 DH </strong>
                    </div>
                  </div>
                </div>

                <div className="calculations">
                  <div className="calculation-row">
                    <span> Subtotal </span>

                    <strong> 1,178 DH </strong>
                  </div>

                  <div className="calculation-row">
                    <div className="shipping-label">
                      <span> Shipping to Morocco </span>

                      <small> Expédition Gratuite </small>
                    </div>

                    <strong> 0 DH (FREE) </strong>
                  </div>
                </div>

                <div className="total-row">
                  <div>
                    <span> Total Due Upon Delivery </span>

                    <small> Montant à régler au livreur </small>
                  </div>

                  <strong> 1,178 DH </strong>
                </div>

                <button
                  className="confirm-order-button"
                  id="confirm-order-btn"
                  type="button"
                >
                  <span> Confirm Order (Pay on Delivery) </span>

                  <span className="material-symbols-outlined">
                    {" "}
                    arrow_forward{" "}
                  </span>
                </button>

                <div className="trust-section">
                  <div className="trust-grid">
                    <div className="trust-item">
                      <span className="material-symbols-outlined"> lock </span>

                      <span> 100% Zero Risk </span>
                    </div>

                    <div className="trust-item">
                      <span className="material-symbols-outlined">
                        local_shipping
                      </span>

                      <span> Direct COD Courier </span>
                    </div>

                    <div className="trust-item">
                      <span className="material-symbols-outlined">
                        support_agent
                      </span>

                      <span> VIP Support MA </span>
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

        <div className="modal-overlay hidden" id="order-modal">
          <div className="confirmation-modal">
            <div className="confirmation-icon">
              <span className="material-symbols-outlined"> check_circle </span>
            </div>

            <div className="confirmation-text">
              <span> Commande Enregistrée </span>

              <h3>Order Confirmed</h3>

              <p>
                Thank you. Our Moroccan fulfillment agent will contact you
                shortly via call/WhatsApp to validate your address before
                dispatch.
              </p>
            </div>

            <div className="confirmation-details">
              <div>
                <span> Total Cash on Delivery: </span>

                <strong> 1,178 DH </strong>
              </div>

              <div>
                <span> Expected Arrival: </span>

                <strong> 24 - 48 Hours </strong>
              </div>
            </div>

            <button
              id="close-modal-btn"
              className="continue-button"
              type="button"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
