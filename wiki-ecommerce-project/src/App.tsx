import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./home/HomePage";
import { CartPage } from "./cart/CartPage";
import { CheckoutPage } from "./checkout/CheckoutPage";
import { ProductDetailsPage } from "./ProductDetails/ProductDetailsPage";
import { CollectionsPage } from "./collections/CollectionsPage";
import { OrderPage } from "./orders/OrderPage";
import { ScrollToTop } from "./components/ScrollToTop";
import {
  type Product,
  type CartItem,
  type OrderItem,
} from "./backend/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminLoginPage } from "./admin/AdminLoginPage";
import { AdminPage } from "./admin/adminPage";

import { getProducts } from "./services/productsService";
import { SignInPage } from "./components/SingInPage";
import { SignUpPage } from "./components/SingUpPage";
import { getOrders } from "./services/ordersService";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const [cart, setCart] = useState<CartItem[]>(
    () => JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[],
  );

  const [orders, setOrders] = useState<OrderItem[]>([]);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data as Product[]);
      } catch {
        setProducts([]);
      }
    }

    void loadProducts();
  }, []);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();

        setOrders(data);
      } catch {
        setOrders([]);
      }
    }

    void loadOrders();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={<HomePage cart={cart} products={products} />}
        />

        <Route
          path="/cartPage"
          element={<CartPage cart={cart} setCart={setCart} />}
        />

        <Route
          path="/checkoutPage"
          element={
            <CheckoutPage cart={cart} setCart={setCart} setOrders={setOrders} />
          }
        />

        <Route
          path="/productDetails/:id"
          element={
            <ProductDetailsPage
              cart={cart}
              products={products}
              setCart={setCart}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          }
        />

        <Route
          path="/collectionsPage"
          element={<CollectionsPage cart={cart} products={products} />}
        />

        <Route
          path="/orderPage"
          element={<OrderPage cart={cart} orders={orders} />}
        />

        <Route path="/Header" element={<Header cart={cart} />} />

        <Route path="/admin-login" element={<AdminLoginPage />} />

        <Route path="/sign-in" element={<SignInPage />} />

        <Route path="/sign-up" element={<SignUpPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage
                orders={orders}
                setOrders={setOrders}
                products={products}
                setProducts={setProducts}
              />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
