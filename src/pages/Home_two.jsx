import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const services = [
        'Postpartum Doula Support',
        'Newborn Care Specialists',
        'Sleep Consultation',
        'Infant Feeding Support',
        'Sibling Adjustments',
        'Overnight Care',
        'Infant Laundry',
    ];

    return (
        <>
            {/* Hero Section with background image */}
            <section className="hero">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold">Newborn Gentle Care</h1>
                    <p className="lead mb-4">
                        Providing Compassionate Postpartum Support and Expert Newborn Care
                    </p>
                    <p className="fs-5">
                        <strong>LET US TAKE CARE OF YOU</strong><br />
                        Certified in Postpartum Doula, NCS and Sleep Consultation<br />
                        with over 25 Years of experience
                    </p>
                    <Link to="/contact" className="btn btn-primary btn-lg mt-3">
                        Get in Touch
                    </Link>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4">NEWBORN & POSTPARTUM SERVICES</h2>
                    <div className="row g-4">
                        {services.map((item, idx) => (
                            <div key={idx} className="col-12 col-md-6 col-lg-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{item}</h5>
                                        <p className="card-text text-muted flex-grow-1"></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Why Choose Newborn Gentle Care?</h2>
                    <div className="row text-center">
                        <div className="col-md-4 mb-3">
                            <i className="bi bi-heart-pulse fs-1 mb-2 text-primary"></i>
                            <h5>Experienced Team</h5>
                            <p className="text-muted">25+ years in newborn & postpartum care.</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <i className="bi bi-shield-check fs-1 mb-2 text-primary"></i>
                            <h5>Certified Professionals</h5>
                            <p className="text-muted">Doula, NCS & Sleep Consultant certified.</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <i className="bi bi-people fs-1 mb-2 text-primary"></i>
                            <h5>Family‑Focused</h5>
                            <p className="text-muted">Support that adapts to your whole family.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-5">
                <div className="container">
                    <h3>Ready to feel supported?</h3>
                    <p className="mb-4">Contact us today and let Gentle Care make your transition smoother.</p>
                    <Link to="/contact" className="btn btn-outline-primary btn-lg">
                        Contact Gentle Care
                    </Link>
                </div>
            </section>
        </>
    );
}