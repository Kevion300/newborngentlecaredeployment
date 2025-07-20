import React from 'react';
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
    return (
        <section className="aboutus bg-light py-5">
            <div className="container">
                {/* Hero Intro */}
                <div className="row align-items-center mb-5">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <img
                            src="/michellenew.png"
                            alt="Michelle Burton with newborn"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-3">About Us</h2>
                        <p className="lead">
                            <strong>LET US TAKE CARE OF YOU.</strong> Certified in Postpartum Doula,
                            NCS and Sleep Consultation with over 25 years of experience.
                        </p>
                        <p>
                            At Gentle Care, every family is unique—and we honor that by providing
                            personalized, compassionate support from day one. I’m Michelle Burton,
                            Founder and Lead Doula, and I guide new parents through feeding, sleep,
                            and daily care with expertise and empathy.
                        </p>
                        <p>
                            With my background in newborn care and postpartum support, I’m here day
                            and night to ensure both you and your baby thrive. From gentle hands‑on
                            assistance to emotional reassurance, my mission is to make your transition
                            to parenthood as smooth and joyful as possible.
                        </p>
                    </div>
                </div>

                {/* Mission · Vision · Values */}
                <div className="row text-center mb-5">
                    <div className="col-md-4 mb-4">
                        <i className="bi bi-heart-fill fs-1 text-primary mb-2"></i>
                        <h5>Our Mission</h5>
                        <p className="text-muted">
                            To empower new parents with expert, gentle care and peace of mind.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <i className="bi bi-eye-fill fs-1 text-primary mb-2"></i>
                        <h5>Our Vision</h5>
                        <p className="text-muted">
                            A world where every family transitions to parenthood with confidence.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <i className="bi bi-award-fill fs-1 text-primary mb-2"></i>
                        <h5>Our Values</h5>
                        <p className="text-muted">
                            Compassion, expertise, and unwavering support for families.
                        </p>
                    </div>
                </div>

                {/* Team Section: now only Michelle */}
                <div className="mb-5">
                    <h3 className="text-center mb-4">Meet Michelle</h3>
                    <div className="row justify-content-center">
                        {team.map((member, idx) => (
                            <div key={idx} className="col-12 col-sm-8 col-md-6 col-lg-4">
                                <div className="card border-0 shadow-sm text-center">
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="card-img-top rounded-circle mx-auto mt-4"
                                        style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title mb-1">{member.name}</h5>
                                        <p className="text-muted mb-0">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h4 className="mb-3">Ready to Join the Gentle Care Family?</h4>
                    <Link to="/contact" className="btn btn-primary btn-lg">
                        Contact Us Today
                    </Link>
                </div>
            </div>
        </section>
    );
}
