import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Mininavbar from "./Components/MiniNavbar/Mininavbar";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Mininavbar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
