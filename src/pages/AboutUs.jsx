// src/pages/AboutUs.jsx

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Only one team member for now
const team = [
    {
        name: 'Michelle Burton',
        role: 'Founder & Lead Postpartum Doula',
        photo: '/team/michelle.jpg',
    },
];

export default function AboutUs() {
    const sectionRef = useRef();
    const [visible, setVisible] = useState(false);

    // Scroll to top when the page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fade‑in on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`storybook-about py-5 fade-in-element ${visible ? 'visible' : ''}`}
        >
            <div className="container">
                {/* Title */}
                <h2 className="cover-title text-center mb-4">About Us</h2>

                {/* Intro Row */}
                <div className="row align-items-center mb-5">
                    <div className="col-md-6 text-center mb-4 mb-md-0">
                        <img
                            src="/michellenew.png"
                            alt="Michelle cradling newborn (watercolor)"
                            className="img-fluid rounded shadow-sm"
                            style={{ maxWidth: '300px' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card card-kids p-4 bg-soft-pink shadow-sm">
                            <p className="lead">
                                <strong>LET US TAKE CARE OF YOU.</strong> Certified in Postpartum Doula,
                                NCS & Sleep Consultation with over 25 years of experience.
                            </p>
                            <p>
                                At Gentle Care, every family is a story waiting to be told. I’m Michelle
                                Burton—your guide through the magical (and sometimes messy) journey of
                                newborn life. From first feeds to peaceful sleep, I bring gentle,
                                expert support to help you write your own happy beginning.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission · Vision · Values */}
                <div className="row text-center mb-5">
                    {[
                        {
                            icon: 'bi-heart-fill',
                            title: 'Our Mission',
                            text: 'Empower new parents with expert, gentle care and peace of mind.',
                        },
                        {
                            icon: 'bi-eye-fill',
                            title: 'Our Vision',
                            text: 'A world where every family begins with confidence and calm.',
                        },
                        {
                            icon: 'bi-award-fill',
                            title: 'Our Values',
                            text: 'Compassion, expertise, and unwavering support—always.',
                        },
                    ].map((item, i) => (
                        <div key={i} className="col-md-4 mb-4">
                            <div className="card card-kids p-3 h-100 text-center shadow-sm">
                                <i className={`bi ${item.icon} fs-1 text-primary mb-2`}></i>
                                <h5 className="mb-2">{item.title}</h5>
                                <p className="mb-0">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Meet Michelle */}
                <div className="mb-5">
                    <h3 className="text-center mb-4">Meet Michelle</h3>
                    <div className="row justify-content-center">
                        {team.map((member, idx) => (
                            <div key={idx} className="col-12 col-sm-8 col-md-6 col-lg-4">
                                <div className="card card-kids border-0 shadow-sm text-center p-4">
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="rounded-circle mx-auto mb-3"
                                        style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                                    />
                                    <h5 className="card-title mb-1">{member.name}</h5>
                                    <p className="mb-0">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <Link to="/contact" className="btn btn-outline-primary btn-lg cover-button">
                        Contact Us Today
                    </Link>
                </div>
            </div>
        </section>
    );
}
