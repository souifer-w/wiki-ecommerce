import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import "./CartPage.css";
export function CartPage() {
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
      <Header />
      <main className="main-content">
        <section className="breadcrumb-section">
          <div className="container breadcrumb-wrapper">
            <div className="breadcrumb">
              <Link to="#">HOME</Link>

              <span>/</span>

              <strong>BAG &amp; ORDER REVIEW</strong>
            </div>

            <div className="checkout-progress">
              <div className="progress-step active">
                <span>1</span>
                <strong>SHOPPING BAG</strong>
              </div>

              <div className="progress-line"></div>

              <div className="progress-step">
                <span>2</span>
                <strong>DELIVERY INFO (COD)</strong>
              </div>

              <div className="progress-line"></div>

              <div className="progress-step">
                <span>3</span>
                <strong>CONFIRMATION</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="cart-section">
          <div className="container">
            <div className="cart-heading">
              <div>
                <span className="locations">
                  RABAT • CASABLANCA • MARRAKECH • TANGIER
                </span>

                <h1 id="cartHeaderTitle">YOUR CART (2 ITEMS)</h1>
              </div>

              <div className="inspection-note">
                <span className="material-symbols-outlined">
                  {" "}
                  verified_user{" "}
                </span>

                <span> Complimentary Inspection Upon Delivery Included </span>
              </div>
            </div>

            <div className="cart-layout">
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

                <div className="cart-items" id="cartItemsList">
                  <article
                    className="cart-item"
                    data-price="680"
                    id="cart-item-1"
                  >
                    <div className="product-image">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB609XdgiAhAtM9ZsdLN6T0i7en8oytn4urT_Tr_Atrc9XP8cfg8TWWMfiwbdzydVpfBmRtzyQ7m4R2kxA_Eh7QRo1g3cv4UmC_-gNSQ24hnkRlX_V5oZyjG3UMnBkV06sryvhB9MDThc9_CzJsLyrm5fMR1z9PcDbtil7UknUMmbPHL9MX4iIoNMdRXpLX2EMTWDoke01C5md_msFDeLP9xgYTE03m1UF0mtSe0x75iO9ciqgq_hbl5Q"
                        alt="Tailored Minimalist Wool Bomber Jacket"
                      />

                      <span className="product-badge"> AUTUMN/WINTER </span>
                    </div>

                    <div className="product-info">
                      <div>
                        <div className="product-header">
                          <div>
                            <span className="product-category">
                              OUTERWEAR • TAILORED CUT
                            </span>

                            <h2>Tailored Minimalist Wool Bomber Jacket</h2>
                          </div>

                          <div className="product-price">
                            <strong id="price-display-1"> 680 DH </strong>

                            <span> 680 DH each </span>
                          </div>
                        </div>

                        <div className="product-details">
                          <div>
                            <span>Size:</span>
                            <strong>L</strong>
                          </div>

                          <div>
                            <span>Color:</span>
                            <i className="color-black"></i>
                            <strong>Noir Black</strong>
                          </div>

                          <div>
                            <span>SKU:</span>
                            <strong>WK-BM-09</strong>
                          </div>
                        </div>
                      </div>

                      <div className="product-controls">
                        <div className="quantity">
                          <button aria-label="Decrease quantity">
                            <span className="material-symbols-outlined">
                              remove
                            </span>
                          </button>

                          <span id="qty-val-1"> 1 </span>

                          <button aria-label="Increase quantity">
                            <span className="material-symbols-outlined">
                              {" "}
                              add{" "}
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <button>
                            <span className="material-symbols-outlined">
                              favorite
                            </span>

                            <span className="desktop-only">
                              {" "}
                              Save for Later{" "}
                            </span>
                          </button>

                          <button className="remove-button">
                            <span className="material-symbols-outlined">
                              delete_outline
                            </span>

                            <span> Remove </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article
                    className="cart-item"
                    data-price="249"
                    id="cart-item-2"
                  >
                    <div className="product-image">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7ExjTL6G5AovRZ0KvWqlOKvcgDDBpaRYKEIZiISbATa4ZRZLgQQHX-IW4q8peIY67qo6kUOMsW0pOVSkJ2GvZDL9YlqCZryLpdw5kQ2YduktIYO73G3auXnw0jd6fcLeNOYaJNR_MIMMWdoMuSDNwvv81n2Oe0fP6288f83VXtU5dXz8Xuu8ZADpM7ZBGX8Ho7va2UDu7-RW-kwO2zx54Aa33pV86N17d6NQUFAR5MXcaxiuTPxM3nA"
                        alt="Oversized Heavyweight Cotton Tee"
                      />

                      <span className="product-badge light"> ESSENTIALS </span>
                    </div>

                    <div className="product-info">
                      <div>
                        <div className="product-header">
                          <div>
                            <span className="product-category">
                              LUXURY KNITWEAR • 280 GSM
                            </span>

                            <h2>Oversized Heavyweight Cotton Tee</h2>
                          </div>

                          <div className="product-price">
                            <strong id="price-display-2"> 498 DH </strong>

                            <span> 249 DH each </span>
                          </div>
                        </div>

                        <div className="product-details">
                          <div>
                            <span>Size:</span>
                            <strong>M</strong>
                          </div>

                          <div>
                            <span>Color:</span>
                            <i className="color-white"></i>
                            <strong>Alabaster Off-White</strong>
                          </div>

                          <div>
                            <span>SKU:</span>
                            <strong>WK-TS-02</strong>
                          </div>
                        </div>
                      </div>

                      <div className="product-controls">
                        <div className="quantity">
                          <button aria-label="Decrease quantity">
                            <span className="material-symbols-outlined">
                              remove
                            </span>
                          </button>

                          <span id="qty-val-2"> 2 </span>

                          <button aria-label="Increase quantity">
                            <span className="material-symbols-outlined">
                              {" "}
                              add{" "}
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <button>
                            <span className="material-symbols-outlined">
                              favorite
                            </span>

                            <span className="desktop-only">
                              {" "}
                              Save for Later{" "}
                            </span>
                          </button>

                          <button className="remove-button">
                            <span className="material-symbols-outlined">
                              delete_outline
                            </span>

                            <span> Remove </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="empty-cart hidden" id="cartEmptyState">
                  <div className="empty-icon">
                    <span className="material-symbols-outlined">
                      {" "}
                      shopping_bag{" "}
                    </span>
                  </div>

                  <h3>YOUR BAG IS CURRENTLY EMPTY</h3>

                  <p>
                    Explore our tailored modern essentials crafted with
                    heavyweight textiles for effortless everyday refinement.
                  </p>

                  <Link to="#"> EXPLORE COLLECTION </Link>
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

              <aside className="cart-right">
                <div className="summary-card">
                  <div className="summary-heading">
                    <h2>ORDER SUMMARY</h2>

                    <span> CASH ON DELIVERY </span>
                  </div>

                  <div className="summary-rows">
                    <div className="summary-row">
                      <span>
                        Subtotal (<span id="summaryItemCount">3</span> items)
                      </span>

                      <strong id="subtotalDisplay"> 1,178 DH </strong>
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

                    <strong id="totalDisplay"> 1,178 DH </strong>

                    <p>All prices in Moroccan Dirhams (MAD / DH)</p>
                  </div>

                  <button className="checkout-button">
                    <span> PROCEED TO CHECKOUT </span>

                    <span className="material-symbols-outlined">
                      arrow_right_alt
                    </span>
                  </button>

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

        <section className="pairings-section">
          <div className="container">
            <div className="pairings-heading">
              <div>
                <span> COMPLETE THE SILHOUETTE </span>

                <h2>FREQUENTLY PAIRED PIECES</h2>
              </div>

              <Link to="#"> VIEW FULL LOOKBOOK </Link>
            </div>

            <div className="pairings-grid">
              <div className="pairing-card">
                <div className="pairing-image">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6C4X_Fr0kyoI9w7fYdz-TBwpwXhSvrXhzuR5H4OFpoD6VAYESmKiFjGDEAhLOA453PLrbkrLrIF2QS7brmHqPeTsT_IqbP9ZNVgKnWMwQid8qFcRWYzfluBxXRl_B7FbjacFBaZqXgDB7HAuMs0EeLq2A8OCyLyGIfQ1b8kqWpQKLnClzCx8-UF8mP9-TTmjyiWOwVdiydjCMreX_xlc__DNKQ4MZ0iiRZBaLNORd6WlsHCU4-pJudQ"
                    alt="Pleated High-Rise Wool Trousers"
                  />

                  <span> PERFECT MATCH </span>
                </div>

                <div className="pairing-content">
                  <div>
                    <small> TROUSERS </small>

                    <h3>Pleated High-Rise Wool Trousers</h3>

                    <strong> 540 DH </strong>
                  </div>

                  <button>+ QUICK ADD (M)</button>
                </div>
              </div>

              <div className="pairing-card">
                <div className="pairing-image">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4-MgXFiqxwSex0q5g0RoQiTUQkY4DUbTdSMyNFh-bInc6V_ZCy4QbUi-NNziiEKJZWB4NPvNSMwpCDFucYZJW6geVIInPyVYjIbMTMjxcFoSkypW5_YasvdELgCsxH12RczCZXw4mfEwJfzAAEmBxPN1oHwNaJflT-Fe4BnYV_mgvVVwdAd903IRtpOvUQYZYk-i_KeUe4Q2nY9SreeII1IzulK9xkYutzVGEFs93K7m-JeWUqNArnA"
                    alt="Structured Leather Penny Loafers"
                  />
                </div>

                <div className="pairing-content">
                  <div>
                    <small> FOOTWEAR </small>

                    <h3>Structured Leather Penny Loafers</h3>

                    <strong> 890 DH </strong>
                  </div>

                  <button>+ QUICK ADD (42)</button>
                </div>
              </div>

              <div className="pairing-card">
                <div className="pairing-image">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8D7PWz377EeqKIWlVGDDnHhtjMHT_n1rmaFjTnK5QV1W_KEElfL3915eETThstdMHCWJcIuKYfYmVjlvl1Zazn9VTqzrzth6Wjj25PIJMP_XI0hILJnAgak92xfXkhZ0LLxM13lvg6_CIkG6QldMhBl5EXt0LqubKWKxUceU2oeHaScnJ_euwyjcBaOovlSLMc0lu7aHnjyGNQUdNH0RJiO6sIndhpJ8Ny7O_35J_u-80Ll0C92m5eA"
                    alt="Refined Calfskin Dress Belt"
                  />
                </div>

                <div className="pairing-content">
                  <div>
                    <small> LEATHER GOODS </small>

                    <h3>Refined Calfskin Dress Belt</h3>

                    <strong> 290 DH </strong>
                  </div>

                  <button>+ QUICK ADD (95)</button>
                </div>
              </div>

              <div className="pairing-card">
                <div className="pairing-image">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxqGfGBvWM5sX4CoyNxyU5fSf3C_aJV_El3j91w1C_nP-F7e0kQbVobq5DSp-0yPXeJb1JaRLkVUSOcGHRkqKF3R-veZCDVD3bs7ULeGLK1czU9Uynm1dyFK_a2OQBUWF6WYxwpjLsOBSQEFXp3KgX5IMxJbSJYbk3VCePcyrhr5XKo5bkS0L6oipIUFgImds-Z2xJk3nMxLUkDoDbHjlKYHjQeQbaKca8b9Kjnoo3EAF7vL7lh8UY9g"
                    alt="Architectural Leather Carry-All"
                  />
                </div>

                <div className="pairing-content">
                  <div>
                    <small> BAGS </small>

                    <h3>Architectural Leather Carry-All</h3>

                    <strong> 780 DH </strong>
                  </div>

                  <button>+ QUICK ADD (ONE SIZE)</button>
                </div>
              </div>
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
