import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./home/HomePage";
import { CartPage } from "./cart/CartPage";
import { CheckoutPage } from "./checkout/CheckoutPage";
import { ProductDetailsPage } from "./ProductDetails/ProductDetailsPage";
import { CollectionsPage } from "./collections/CollectionsPage";
import { OrderPage } from "./orders/OrderPage";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/cartPage" element={<CartPage />} />

      <Route path="/checkoutPage" element={<CheckoutPage />} />

      <Route path="/productDetails/:id" element={<ProductDetailsPage />} />

      <Route path="/collectionsPage" element={<CollectionsPage />} />

      <Route path="/orderPage" element={<OrderPage />} />
    </Routes>
  );
}

export default App;
