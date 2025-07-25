// src/pages/Services.jsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const services = [
    {
        title: 'Postpartum Doula Support',
        description:
            'Our postpartum doulas offer compassionate emotional and physical recovery support after birth. We provide invaluable guidance on newborn care, including feeding, diapering, and comforting. Our goal is to ensure a smooth and joyful transition into new parenthood.',
        image: '/postpartum-doula-support.png',
    },
    {
        title: 'Newborn Care Specialists',
        description:
            'Our highly trained newborn care specialists provide comprehensive support tailored to your baby’s needs during the first few months. This includes establishing healthy feeding and sleep routines, hands‑on assistance with diapering, bathing, and soothing techniques.',
        image: '/newborn-care-specialists.png',
    },
    {
        title: 'Sleep Consultation',
        description:
            'Achieve restful nights with our personalized sleep consultation services. We develop gentle sleep plans that respect your baby’s individual needs and your parenting philosophy.',
        image: '/sleep-consultation.png',
    },
    {
        title: 'Infant Feeding & Diaper Support',
        description:
            'Comprehensive feeding and diapering care: expert latch coaching, bottle/pump prep, gentle diaper changes, and skin‑to‑skin soothing strategies.',
        image: '/infant-feeding-diaper-support.png',
    },
    {
        title: 'Sibling Adjustments',
        description:
            'Gentle, age‑appropriate strategies to help older siblings welcome the new baby and adjust to the growing family.',
        image: '/sibling-adjustments.png',
    },
    {
        title: 'Overnight Care',
        description:
            'Peace of mind with overnight support—rest easy while we tend to your newborn’s needs and prepare a cozy morning welcome.',
        image: '/overnight-care.png',
    },
    {
        title: 'Infant Laundry',
        description:
            'Laundry care for all those tiny outfits—clean, dry, and folded, ready for your baby’s next adventure.',
        image: '/infant-laundry.png',
    },
];

export default function Services() {
    // Scroll to top when this page mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="text-center mb-2">Our Services</h1>
                <p className="text-center mb-5">
                    Comprehensive newborn & postpartum care tailored to your family.
                </p>

                {services.map((svc, idx) => (
                    <div key={idx} className="row align-items-center mb-5">
                        {/* Text column */}
                        <div className={`col-md-6 ${idx % 2 === 1 ? 'order-md-2' : ''}`}>
                            <h4 className="mb-3">{svc.title}</h4>
                            <p>{svc.description}</p>
                        </div>

                        {/* Image column */}
                        <div className={`col-md-6 text-center ${idx % 2 === 1 ? 'order-md-1' : ''}`}>
                            <img
                                src={svc.image}
                                alt={svc.title}
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: '300px', width: 'auto' }}
                            />
                        </div>
                    </div>
                ))}

                <div className="text-center mt-5">
                    <Link to="/contact" className="btn btn-outline-primary btn-lg cover-button">
                        Inquire About a Service
                    </Link>
                </div>
            </div>
        </section>
    );
}
