import React from 'react';

const testimonials = [
    {
        name: 'Janet D.',
        message:
            'Our sleep consultant from Gentle Care Newborn Specialists helped us establish healthy sleep habits for our newborn. We went from sleepless nights to peaceful rest in just a few days!',
    },
    {
        name: 'Sarah L., New Mom',
        message:
            'Gentle Care Newborn Specialists were a godsend during my postpartum recovery. Their support allowed me to rest and bond with my baby without worry. Highly recommend!',
    },
    {
        name: 'Samantha A.',
        message:
            'Michelle has been wonderful! She is so helpful with my newborn and sweet with my three year old. She is incredibly warm, knowledgeable and trustworthy. Highly recommend her to anyone.',
    },
    {
        name: 'Mark S., Satisfied Dad',
        message:
            'Professional, compassionate, and true experts in their field. Gentle Care Newborn Specialist provided invaluable support that made our transition into parenthood so much smoother.',
    },
    {
        name: 'Jessica M., Grateful Client',
        message:
            'Gentle Care Newborn Specialists were incredibly knowledgeable and kind. They taught us so much and made us feel confident as first‑time parents. Best decision ever!',
    },
    {
        name: 'Trudie B.',
        message:
            'Gentle Care Newborn Specialists have been taking care of our newborn for the past 6 weeks. She has been the perfect overnight doula for my baby girl. Everything they do—from bathing to feeding to swaddling—is both gentle and educational. Thank you for everything!',
    },
];

export default function Testimonials() {
    return (
        <section className="storybook-testimonials py-5">
            <div className="container">
                {/* Title */}
                <h2 className="cover-title text-center mb-5">What Our Clients Say</h2>

                {/* Cards */}
                <div className="row g-4">
                    {testimonials.map((t, i) => (
                        <div key={i} className="col-12 col-md-6 col-lg-4">
                            <div className="card card-kids p-4 h-100 shadow-sm">
                                <p className="mb-3">“{t.message}”</p>
                                <h6 className="mb-0 text-primary">— {t.name}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
