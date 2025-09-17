import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import HomePage from './pages/HomePage';
import AdminPage from "./pages/admin/AdminPage.jsx"
import ProductPage from "./pages/ProductPage.jsx";
import ScrollToTop from './components/ScrollToTop.jsx';
import AllProductsPage from "./pages/AllProductsPage.jsx"
import CollectionPage from "./pages/CollectionPage.jsx"
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import AdminSignUpPage from './pages/admin/AdminSignUpPage.jsx';
import AdminUnAuthorized from './pages/admin/AdminUnAuthorized.jsx';
import AdminProductsPage from './pages/admin/AdminProductsPage.jsx';
import AdminNewProductPage from './pages/admin/AdminNewProductPage.jsx';
import AdminEditProductPage from './pages/admin/AdminEditProductPage.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout.jsx';
import "./styles/utility.scss";
import ContactPage from './pages/ContactPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AdminManagementPage from './pages/admin/AdminManagementPage.jsx';
import AdminNewCoupon from './pages/admin/AdminNewCoupon.jsx';
import AdminCouponEdit from './pages/admin/AdminCouponEdit.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import EmptyLayout from './layouts/EmptyLayout.jsx';
import AdminOrdersPage from './pages/admin/AdminOrdersPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          {/* <Route path="product/:id" element={<ProductPage />} /> */}
          {/* <Route path="collection/:collectionName" element={<CollectionPage />} /> */}
          {/* <Route path="products" element={<AllProductsPage />} /> */}
          {/* <Route path="contact" element={<ContactPage />} /> */}
          {/* <Route path="cart" element={<CartPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="/order/confirmed/:orderId/:paymentMethod/:name/:email" element={<OrderConfirmationPage />} /> */}
        </Route>
        <Route path="checkout/:source/:quantity?/:coupon?/:selectedVariantIndex?" element={<EmptyLayout />}>
          <Route index element={<CheckoutPage />}/>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path='/admin/products' element={<AdminProductsPage />} />
          <Route path='/admin/products/new' element={<AdminNewProductPage />} />
          <Route path='/admin/products/:id/edit' element={<AdminEditProductPage />} />
          <Route path='/admin/management' element={<AdminManagementPage />} />
          <Route path='/admin/management/coupons/new' element={<AdminNewCoupon />} />
          <Route path='/admin/management/coupons/:couponCode/edit' element={<AdminCouponEdit />} />
          <Route path='/admin/orders' element={<AdminOrdersPage />} />
        </Route>
          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route path='/admin/signup' element={<AdminSignUpPage />} />
          <Route path='/admin/unauthorized' element={<AdminUnAuthorized />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
