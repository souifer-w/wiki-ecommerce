import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import "./OrderPage.css";
export function OrderPage() {
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
      />{" "}
      <Header />
      <main className="page">
        <div className="status-bar">
          <span> SARTORIAL HERITAGE — CASABLANCA / PARIS </span>

          <span className="status-shipping">
            EXPÉDITION EXPRESS NATIONALE 24/48H
          </span>

          <span> RÉF : WK-84920 </span>
        </div>

        <div className="main-container">
          <section className="confirmation-header">
            <div className="success-icon-wrapper">
              <div className="success-pulse"></div>

              <div className="success-icon">
                <span className="material-symbols-outlined"> check </span>
              </div>
            </div>

            <p className="eyebrow">ACQUISITION ENREGISTRÉE</p>

            <h1>ORDER CONFIRMED</h1>

            <p className="confirmation-text">
              Thank you for shopping with WIKI. Your order
              <strong>#WK-84920</strong>
              has been successfully logged into our atelier ledger.
            </p>

            <div className="delivery-notice">
              <div className="delivery-line"></div>

              <div className="delivery-content">
                <span className="material-symbols-outlined delivery-icon">
                  call
                </span>

                <div>
                  <div className="delivery-title">
                    <span> PROTOCOLE DE LIVRAISON MAROC </span>

                    <span className="delivery-dot"></span>

                    <span className="whatsapp-label"> WHATSAPP DIRECT </span>
                  </div>

                  <p>
                    We will contact you via phone or WhatsApp (
                    <strong>+212 6 61 23 45 67</strong>) to coordinate and
                    confirm your ideal delivery window before our private
                    courier is dispatched.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="order-grid">
            <div className="left-column">
              <div className="products-module">
                <div className="module-header">
                  <h2>Acquisitions</h2>

                  <span className="eyebrow"> 2 PIECES SELECTED </span>
                </div>

                <article className="product-item">
                  <div className="product-image">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD772i6SuSPRNSOeS50f9aCw6hWSXzSci5HfNE4R-mHC1AYT619wPxlsM-0NCdM9xszvmhTFEuKc1vhouLhSxXpQiuQi_Sel47wNemQPenWNOWn07Xnl5MJd4n7mxNA70n11VoCc3yyv2DkPsaVvNtGT_qzAxmQ4uQVd2WEK_9DFl6E0MUEcCp9ETmEIadp_l2UpT63OAVmDuZpbRJnJ3oLlB_Ti7Z6M1NDJobUaP07yri9YHQm7QIi9A"
                      alt="Tailored Minimalist Wool Bomber Jacket"
                    />
                  </div>

                  <div className="product-details">
                    <div>
                      <div className="product-title-row">
                        <h3>Tailored Minimalist Wool Bomber Jacket</h3>

                        <span className="product-price"> 680 DH </span>
                      </div>

                      <p className="product-meta">
                        Edition Noir Black • Size Large (L) • Qty 1
                      </p>

                      <span className="product-tag">
                        Pure Wool Blend • Atelier Finish
                      </span>
                    </div>

                    <p className="product-reference">REF. WIKI-JKT-092</p>
                  </div>
                </article>

                <article className="product-item">
                  <div className="product-image">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCESgRuoWbCPnvcTmQOxgkdiUNtgi2q-qo2UPs4yedsvMzslo_06UvYDRSkttiKVtUovAMPCIn3GRjZJDRR7_vAUlHWXqPhJQrRLzZpW11ThUTaGYog2WNwbDscfnzZSE8265APCH9LNTCGmHKaufx997hqOX5fRBXWkljtYDpLuHllgzRXWV-NfLFEKSunYJaRu_uu0sNaB1oy3sw4gws-k8K5tkAOZyoFisa98_60vSrDAZinfO_UKw"
                      alt="Oversized Heavyweight Cotton Tee"
                    />
                  </div>

                  <div className="product-details">
                    <div>
                      <div className="product-title-row">
                        <h3>Oversized Heavyweight Cotton Tee</h3>

                        <span className="product-price"> 498 DH </span>
                      </div>

                      <p className="product-meta">
                        Off-White • Size Medium (M) • Qty 2 • (249 DH each)
                      </p>

                      <span className="product-tag">
                        300 GSM Organic Combed Cotton
                      </span>
                    </div>

                    <p className="product-reference">REF. WIKI-TEE-044</p>
                  </div>
                </article>

                <div className="price-ledger">
                  <div className="ledger-row">
                    <span> Sous-total articles </span>

                    <strong> 1,178 DH </strong>
                  </div>

                  <div className="ledger-row">
                    <span className="shipping-label">
                      Expédition Nationale Express (Casablanca)
                      <small> OFFERT </small>
                    </span>

                    <strong> 0 DH </strong>
                  </div>

                  <div className="ledger-row">
                    <span> Frais de Paiement à la Livraison </span>

                    <strong> 0 DH </strong>
                  </div>

                  <div className="ledger-total">
                    <div>
                      <span> Total à Régler </span>

                      <small> ESPÈCES À RÉCEPTION </small>
                    </div>

                    <div className="total-value">
                      <strong> 1,178 DH </strong>

                      <small> TVA INCLUSE </small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inspection-callout">
                <span className="material-symbols-outlined"> verified </span>

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
              <div className="order-ledger">
                <h2 className="module-title">BORDEREAU DE COMMANDE</h2>

                <dl className="order-details">
                  <div>
                    <dt>Numéro de Commande</dt>

                    <dd>#WK-84920</dd>
                  </div>

                  <div>
                    <dt>Date d'Enregistrement</dt>

                    <dd>24 Mai 2026</dd>
                  </div>

                  <div>
                    <dt>Mode de Paiement</dt>

                    <dd className="uppercase">Paiement à la Livraison (COD)</dd>
                  </div>

                  <div>
                    <dt>Montant Exigible</dt>

                    <dd className="bold">1,178 DH</dd>
                  </div>
                </dl>

                <div className="destination">
                  <div className="destination-heading">
                    <span> ADRESSE DE DESTINATION </span>

                    <span className="material-symbols-outlined">
                      local_shipping
                    </span>
                  </div>

                  <div className="address-card">
                    <p className="customer-name">Yassine El Mansouri</p>

                    <p className="address">
                      42 Boulevard d'Anfa, Quartier Racine
                      <br />
                      Grand Casablanca, Maroc
                      <br />
                      Code Postal: 20050
                    </p>

                    <div className="phone">
                      <span className="material-symbols-outlined">
                        phone_iphone
                      </span>

                      <span> +212 6 61 23 45 67 </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-module">
                <h2 className="module-title">
                  ACHEMINEMENT & ÉTAPES SUIVANTES
                </h2>

                <div className="timeline">
                  <div className="timeline-step completed">
                    <div className="timeline-marker">
                      <span className="material-symbols-outlined"> check </span>
                    </div>

                    <div className="timeline-content">
                      <span> 1. ORDER PLACED </span>

                      <p>
                        Order registered in Casablanca logistics center.
                        (Completed)
                      </p>
                    </div>
                  </div>

                  <div className="timeline-step active">
                    <div className="timeline-marker">
                      <span></span>
                    </div>

                    <div className="timeline-content">
                      <span> 2. PHONE / WHATSAPP CONFIRMATION </span>

                      <p>
                        Our concierge connects via WhatsApp to validate
                        availability and slot. (Pending)
                      </p>
                    </div>
                  </div>

                  <div className="timeline-step">
                    <div className="timeline-marker"></div>

                    <div className="timeline-content">
                      <span> 3. HANDED TO MOROCCAN COURIER </span>

                      <p>
                        Direct dispatch in discreet luxury dustbags via private
                        fleet.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-step">
                    <div className="timeline-marker"></div>

                    <div className="timeline-content">
                      <span> 4. DOORSTEP SETTLEMENT </span>

                      <p>
                        Inspect garments and pay exactly
                        <strong>1,178 DH</strong>
                        in cash to the delivery specialist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="experience-panel">
            <div className="experience-top">
              <div>
                <h2>Poursuivre l'Expérience WIKI</h2>

                <p>
                  A confirmation document has been generated. Explore our
                  seasonal permanent collection or contact our dedicated
                  stylist.
                </p>
              </div>

              <div className="cta-buttons">
                <Link to="/all-products" className="primary-button">
                  CONTINUE SHOPPING
                </Link>

                <Link to="#" className="secondary-button">
                  <span className="material-symbols-outlined"> download </span>
                  DOWNLOAD ORDER INVOICE (PDF)
                </Link>
              </div>
            </div>

            <div className="whatsapp-bar">
              <div className="whatsapp-info">
                <div className="whatsapp-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
                  </svg>
                </div>

                <div>
                  <p>Besoin d'une modification immédiate ?</p>

                  <span>
                    Nos conseillers à Casablanca sont disponibles 7j/7 de 9h à
                    21h.
                  </span>
                </div>
              </div>

              <a
                className="whatsapp-button"
                href="https://wa.me/212661234567?text=Bonjour%20WIKI,%20je%20souhaite%20des%20informations%20concernant%20ma%20commande%20WK-84920"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span> CHAT WITH WIKI MOROCCAN CONCIERGE ON WHATSAPP </span>

                <span className="material-symbols-outlined">
                  {" "}
                  arrow_forward{" "}
                </span>
              </a>
            </div>
          </section>

          <div className="footer-note">
            WIKI MAISON DE COUTURE MASCULINE • CASABLANCA • MAROC
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
