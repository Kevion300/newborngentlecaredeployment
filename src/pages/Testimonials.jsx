import React from 'react';

const testimonials = [
    {
        name: 'Janet D.',
        message:
            'Our sleep consultant from Newborn Gentle Care helped us establish healthy sleep habits for our newborn. We went from sleepless nights to peaceful rest in just a few days!',
    },
    {
        name: 'Sarah L., New Mom',
        message:
            'Newborn Gentle Care Specialists were a godsend during my postpartum recovery. Their support allowed me to rest and bond with my baby without worry. Highly recommend!',
    },
    {
        name: 'Samantha A.',
        message:
            'Michelle has been wonderful! She is so helpful with my newborn and sweet with my three year old. She is incredibly warm, knowledgeable and trustworthy, I highly recommend her to anyone.',
    },
    {
        name: 'Mark S., Satisfied Dad',
        message:
            'Professional, compassionate, and truly experts in their field. Newborn Gentle Care provided invaluable support that made our transition into parenthood so much smoother.',
    },
    {
        name: 'Jessica M., Grateful Client',
        message:
            'Newborn Gentle Care Specialists were incredibly knowledgeable and kind. They taught us so much and made us feel confident as first-time parents. Best decision ever!',
    },
    {
        name: 'Trudie B.',
        message:
            'Newborn Gentle Care Specialists have been taking care of our newborn for the past 6 weeks. She has been the perfect overnight doula for my baby girl. Everything they do, from bathing to feeding to swaddling, is both gentle and educational. They have a very calming presence and made me feel comfortable from day one. My newborn is thriving and I am well rested. We will miss their services so much when our time is up. Thank you for everything!',
    },
];

export default function Testimonials() {
    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-5">What Our Clients Say</h2>
                <div className="row g-4">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body d-flex flex-column">
                                    <p className="card-text mb-4 flex-grow-1">“{t.message}”</p>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                t.name
                                            )}&background=8dd8c0&color=ffffff&rounded=true`}
                                            alt={t.name}
                                            className="rounded-circle me-3"
                                            width="48"
                                            height="48"
                                        />
                                        <h6 className="mb-0">{t.name}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
