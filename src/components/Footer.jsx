// src/components/Footer.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-light text-center py-3 mt-auto">
            <div className="container d-flex justify-content-center align-items-center">
                <span>© {new Date().getFullYear()} Newborn Gentle Care</span>
                <NavLink to="/contact" className="ms-3 text-decoration-none">
                    Contact Us
                </NavLink>
                <a
                    href="https://www.facebook.com/share/1CDrUgGrec/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ms-3 text-decoration-none"
                    aria-label="Facebook"
                >
                    <i className="bi bi-facebook fs-4"></i>
                </a>
                <a
                    href="https://www.instagram.com/YourProfile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ms-3 text-decoration-none"
                    aria-label="Instagram"
                >
                    <i className="bi bi-instagram fs-4"></i>
                </a>
            </div>
        </footer>
    );
}
