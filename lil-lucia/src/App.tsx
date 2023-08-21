import { useCallback, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./components";
import Authentication from "./components/user-related/authentication.component";
import UserProfile from "./components/user-related/user-profile.component";
import UpdateUserProfile from "./components/user-related/update-user-profile.component";
import ProductComponent from "./components/products/products.component";
import CreateProduct from "./components/products/create-products.component";
import UpdateParkingArea from "./components/products/update-products.component";
import CakeSpecificPage from "./components/products/cake-specific-products.components";
import MuffinsSpecificPage from "./components/products/muffins-specific-products.component";
import CookiesSpecificPage from "./components/products/cookies-specific-products.components";
import Checkout from "./components/shopping-cart/checkout";
import OrdersComponent from "./components/orders/orders";
import OrderDetails from "./components/orders/order-detail";

import { User } from "./models/user";
import { AuthContext } from "./common/context/authentication-context";
import { ShoppingCartProvider } from "./common/context/shopping-cart-context";

import "./index.css";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>();

  const login = useCallback((user: User) => {
    setIsLoggedIn(true);
    setUser(user);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(undefined);
  }, []);

  let routes: any;

  if (isLoggedIn) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<ProductComponent />} />
          <Route path="/add-products" element={<CreateProduct />} />
          <Route
            path="/product/edit/:productId"
            element={<UpdateParkingArea />}
          />
          <Route path="/products/cakes" element={<CakeSpecificPage />} />
          <Route path="/products/muffins" element={<MuffinsSpecificPage />} />
          <Route path="/products/cookies" element={<CookiesSpecificPage />} />
          <Route path="/orders" element={<OrdersComponent />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/edit" element={<UpdateUserProfile />} />
          <Route path="*" element={<ProductComponent />} />
        </Routes>
      </>
    );
  } else {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<ProductComponent />} />
          <Route path="/products/cakes" element={<CakeSpecificPage />} />
          <Route path="/products/muffins" element={<MuffinsSpecificPage />} />
          <Route path="/products/cookies" element={<CookiesSpecificPage />} />
          <Route path="/authenticate" element={<Authentication />} />
          <Route path="*" element={<Authentication />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          user: user as User,
          login: login,
          logout: logout,
        }}
      >
        <ShoppingCartProvider>
          <MainLayout />
          {routes}
        </ShoppingCartProvider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
