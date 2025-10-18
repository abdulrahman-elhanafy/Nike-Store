import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";

export default function App() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </div>
    );
}
