import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ProductDetailsPage.css";
import { products } from "../backend/Products";
import { useState } from "react";
export function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find((product) => product.id === Number(id));
  const [selectColor, setSelectColor] = useState(product?.colors[0]);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectImage, setSelecImage] = useState(product?.colors[0].images[0]);

  const [selectSize, setSelectSize] = useState(product?.colors[0].images[0]);

  return (
    <>
      <title>WIKI — Tailored Minimalist Wool Bomber Jacket</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
        rel="stylesheet"
      />
      <Header />
      <main>
        <div className="trust-ribbon">
          <div className="trust-container">
            <span> ATELIER CASABLANCA • SPRING / SUMMER '26 CAPSULE </span>

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

            <span className="current"> TAILORED MINIMALIST WOOL BOMBER </span>
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
                    className={`thumbnail${selectImage === image ? " active" : ""}`}
                    onClick={() => setSelecImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Tailored wool bomber view ${index + 1}`}
                    />

                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </Link>
                ))}
              </div>

              <div className="main-product-image">
                <div className="image-slide" id="image-01">
                  <img
                    src={selectImage}
                    alt="Tailored Minimalist Wool Bomber Jacket"
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
                  <span className="material-symbols-outlined"> zoom_in </span>
                  INSPECT WEAVE
                </div>
              </div>
              {isZoomOpen && (
                <div
                  className="zoom-overlay"
                  onClick={() => setIsZoomOpen(false)}
                >
                  <div
                    className="zoom-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={selectImage} alt={product?.name} />

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
                <h1>{product?.name}</h1>

                <p className="product-description">{product?.description}</p>
              </div>

              <div className="price-card">
                <div className="price-top">
                  <div>
                    <span className="current-price"> {product?.price}DH </span>
                  </div>

                  <span className="tax"> TVA INCLUSE </span>
                </div>

                <div className="product-badges">
                  <span> LIVRAISON GRATUITE MAROC </span>

                  <span> CONTRÔLE AVANT PAIEMENT </span>
                </div>
              </div>

              <div className="cod-information">
                <span className="material-symbols-outlined"> payments </span>

                <div>
                  <strong> PAIEMENT 100% À LA LIVRAISON (COD) </strong>

                  <p>
                    Aucun paiement en ligne. Payez uniquement lorsque votre
                    commande arrive à votre adresse.
                  </p>
                </div>
              </div>

              <div className="selector-section">
                <div className="selector-heading">
                  <span> COLOR </span>

                  <strong>{selectColor?.name}</strong>
                </div>

                <div className="color-options">
                  {product?.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`color-option ${
                        selectColor?.name === color.name ? "active" : ""
                      }`}
                      aria-label={color.name}
                      style={{ backgroundColor: color.value }}
                      onClick={() => {
                        setSelectColor(color);
                        setSelecImage(color.images[0]);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="selector-section">
                <div className="selector-heading">
                  <span> SIZE </span>

                  <Link to="#size-guide"> SIZE GUIDE </Link>
                </div>

                <div className="size-options">
                  {product?.sizes.map((size) => (
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
                  <button type="button">−</button>

                  <span> 1 </span>

                  <button type="button">+</button>
                </div>

                <button className="add-cart">AJOUTER AU PANIER</button>
              </div>

              <div className="guarantee">
                <div className="guarantee-item">
                  <span className="material-symbols-outlined"> schedule </span>

                  <div>
                    <strong> 24 / 48H </strong>

                    <span> Livraison express </span>
                  </div>
                </div>

                <div className="guarantee-item">
                  <span className="material-symbols-outlined"> sync_alt </span>

                  <div>
                    <strong> ÉCHANGE GRATUIT </strong>

                    <span> Changement de taille </span>
                  </div>
                </div>

                <div className="guarantee-item">
                  <span className="material-symbols-outlined"> chat </span>

                  <div>
                    <strong> WHATSAPP </strong>

                    <span> +212 6 00 00 00 00 </span>
                  </div>
                </div>
              </div>

              <div className="accordions">
                <details open>
                  <summary>
                    <span> 01 — CRAFTSMANSHIP & CUT </span>

                    <span className="material-symbols-outlined">
                      {" "}
                      expand_more{" "}
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
                    <span> 02 — COMPOSITION & CARE </span>

                    <span className="material-symbols-outlined">
                      {" "}
                      expand_more{" "}
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
                    <span> 03 — EXPÉDITION & PAIEMENT COD MAROC </span>

                    <span className="material-symbols-outlined">
                      {" "}
                      expand_more{" "}
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

        <section className="styling-section">
          <div className="styling-container">
            <div className="styling-heading">
              <div>
                <span className="eyebrow"> STYLING DIRECTORY </span>

                <h2>COMPLÉTER LE LOOK WIKI</h2>
              </div>

              <p>
                Des pièces essentielles pensées pour fonctionner ensemble et
                construire une silhouette masculine contemporaine.
              </p>
            </div>

            <div className="styling-grid">
              {products.slice(-3).map((product, index) => {
                const image =
                  product.colors[index % product.colors.length].images[0];
                const color =
                  product.colors[index % product.colors.length].name;
                return (
                  <>
                    <article className="styling-card">
                      <div className="styling-image">
                        <img src={image} alt="WIKI tailored trousers" />

                        <span> {index + 1} </span>
                      </div>

                      <div className="styling-content">
                        <h3>{product.name}</h3>

                        <div className="styling-price">{product.price}DH</div>

                        <p>{color}</p>

                        <button className="quick-add">QUICK ADD</button>
                      </div>
                    </article>
                  </>
                );
              })}
            </div>
          </div>
        </section>

        <section className="philosophy-section">
          <span className="eyebrow"> PHILOSOPHIE DE L'HABIT </span>

          <blockquote>
            “Le vêtement ne doit pas parler plus fort que celui qui le porte.”
          </blockquote>

          <p>— STUDIO WIKI CASABLANCA</p>
        </section>

        <section className="size-guide" id="size-guide">
          <div className="size-guide-container">
            <div className="modal-heading">
              <div>
                <span className="eyebrow"> WIKI FIT </span>

                <h2>SIZE GUIDE</h2>
              </div>

              <Link to="#" className="close-modal">
                <span className="material-symbols-outlined"> close </span>
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
