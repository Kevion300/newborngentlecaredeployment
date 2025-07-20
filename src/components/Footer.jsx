import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-light text-center py-3 mt-auto">
            <div className="container">
                © {new Date().getFullYear()} Newborn Gentle Care •{' '}
                <Link to="/contact" className="ms-1">
                    Contact Us
                </Link>
            </div>
        </footer>
    );
}
