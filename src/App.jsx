import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

export default function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="flex-grow-1 container py-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}
