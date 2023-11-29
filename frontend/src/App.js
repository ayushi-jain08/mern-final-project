import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Mininavbar from "./Components/MiniNavbar/Mininavbar";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import LoginSignup from "./Components/LoginSignUp/LoginSignup";
import AllProduct from "./Components/Product/AllProduct";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import SubCategory from "./Components/CategorySlider/SubCategory";
import SubCategoryProduct from "./Components/CategorySlider/SubCategoryProduct";
import Footer from "./Components/Footer/Footer";
import Shipping from "./Components/Shipping/Shipping";
import ConfirmOrder from "./Components/ConfirmOrder/ConfirmOrder";
import CheckOut from "./Components/CheckOut/CheckOut";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./Components/Success/Success";
import Order from "./Components/Order/Order";
import OrderDetails from "./Components/OrderDetails/OrderDetails";
import Search from "./Components/Search/Search";
import ProductByCategory from "./Pages/Category/ProductByCategory";
import MyProfile from "./Components/MyProfile/MyProfile";

function App() {
  const [stripeapiKey, setStripeApiKey] = useState("");
  const [stripeLoaded, setStripeLoaded] = useState(false);

  const getStripeApiKey = async () => {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    try {
      const response = await fetch(`http://localhost:8080/api/stripeapikey`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setStripeApiKey(data.StripeApikey);
        setStripeLoaded(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  };

  useEffect(() => {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (StoredUserInfo) {
      getStripeApiKey();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Mininavbar />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/product" element={<AllProduct />} />
        <Route path="/product/:ids" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/category/:catId" element={<SubCategory />} />
        <Route path="/subcategory/:subId" element={<SubCategoryProduct />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        {stripeLoaded && (
          <Route
            exact
            path="/checkout"
            element={
              <Elements stripe={loadStripe(stripeapiKey)}>
                {" "}
                <CheckOut />
              </Elements>
            }
          />
        )}
        <Route path="/success" element={<Success />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cat/:category" element={<ProductByCategory />} />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
