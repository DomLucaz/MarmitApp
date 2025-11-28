import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Marmitas from "./pages/Marmitas.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Cart from "./pages/Cart.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marmitas" element={<Marmitas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carrinho" element={<Cart />} /> 
        <Route path="/marmitas" element={<RequireAuth><Marmitas /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}


