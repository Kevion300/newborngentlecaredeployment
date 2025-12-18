// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";

// ✅ NEW: admin approvals page (create this file)
import AdminTestimonials from "./pages/AdminTestimonials";

export default function App() {
    const { pathname } = useLocation();
    const isHome = pathname === "/";

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* only show on non-home pages */}
            {!isHome && <Navbar />}

            <main className={`flex-grow-1 container py-5${isHome ? "" : ""}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* ✅ NEW hidden admin route */}
                    <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                </Routes>
            </main>

            {/* only show on non-home pages */}
            {!isHome && <Footer />}
        </div>
    );
}
