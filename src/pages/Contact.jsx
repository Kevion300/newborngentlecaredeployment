import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
    return (
        <section className="contact-us py-5">
            <div className="container">
                {/* Page Title */}
                <h2 className="text-center mb-5">Get in Touch with Gentle Care</h2>

                {/* Contact Methods */}
                <div className="row mb-5">
                    <div className="col-12 col-md-4 text-center mb-4">
                        <i className="bi bi-telephone-fill fs-1 text-primary mb-3"></i>
                        <h5>Call Us</h5>
                        <p><a href="tel:9415855212">941‑585‑5212</a></p>
                    </div>
                    <div className="col-12 col-md-4 text-center mb-4">
                        <i className="bi bi-envelope-fill fs-1 text-primary mb-3"></i>
                        <h5>Email Us</h5>
                        <p><a href="mailto:jianna03shelly@gmail.com">jianna03shelly@gmail.com</a></p>
                    </div>
                    <div className="col-12 col-md-4 text-center mb-4">
                        <i className="bi bi-geo-alt-fill fs-1 text-primary mb-3"></i>
                        <h5>Visit Us</h5>
                        <p>175 Main Street<br />East Haven, CT 06512</p>
                    </div>
                </div>

                {/* Embedded Map */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="ratio ratio-16x9 shadow-sm rounded">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.123456789012!2d-72.92000000000002!3d41.28212345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e5c2b7a1b1c1a1%3A0xabcdef1234567890!2s175%20Main%20St%2C%20East%20Haven%2C%20CT%2006512!5e0!3m2!1sen!2sus!4v0000000000000"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Gentle Care Location"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h4 className="mb-3">Interested in Our Services?</h4>
                    <Link to="/services" className="btn btn-primary btn-lg">
                        Explore Our Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
