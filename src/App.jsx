import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import About from "./pages/about";
import Shop from "./pages/shop";
import Contact from "./pages/contact";
import Certifications from "./pages/certification";
import ProductDetailPage from "./pages/productdetail";
import ShippingPolicy from "./pages/policy";
import Login from "./pages/login";
import Signup from "./pages/signup"
import AddToCart from "./pages/addToCart";
import CheckoutPage from "./pages/checkout";
import CategoryProducts from "./pages/categoryProducts";
// Admin
import AdminGate from "./pages/admin/signin";
import AdminLayout from "./pages/adminLayout";
import AdminNavbar from "./pages/admin/navbar";
import Dashboard from "./pages/admin/dashboard";
import Products from "./pages/admin/products";
import OrderListTable from "./pages/admin/orders";
import CategoriesGrid from "./pages/admin/category";
import Settings from "./pages/admin/settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Website */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="shop" element={<Shop />} />
            <Route path="contact" element={<Contact />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="addtocart" element={<AddToCart />} />
            <Route path="order" element={<CheckoutPage />} />
            <Route path="/products/category/:categoryId" element={<CategoryProducts />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <AdminGate>
                <AdminLayout />
              </AdminGate>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<OrderListTable />} />
            <Route path="categories" element={<CategoriesGrid />} />
            <Route path="navbar" element={<AdminNavbar />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;