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

function App() {
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
      </Routes>
    </>
  );
}

export default App;
