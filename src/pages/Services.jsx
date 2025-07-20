import React from 'react';
import { Link } from 'react-router-dom';

const services = [
    {
        icon: 'bi-people-fill',
        title: 'Postpartum Doula Support',
        description:
            'Our postpartum doulas offer compassionate emotional and physical recovery support after birth. We provide invaluable guidance on newborn care, including feeding, diapering, and comforting. Our goal is to ensure a smooth and joyful transition into new parenthood, helping you build confidence and connect you with community resources.',
    },
    {
        icon: 'bi-heart-pulse-fill',
        title: 'Newborn Care Specialists',
        description:
            'Our highly trained newborn care specialists provide comprehensive support tailored to your baby needs during the first few months. This includes establishing healthy feeding and sleep routines, hands on assistance with diapering, bathing, and soothing techniques. we also help troubleshoot common newborn issues like colic and reflux, empowering you with the knowledge and skills for confident parenting',
    },
    {
        icon: 'bi-moon-stars-fill',
        title: 'Sleep Consultation',
        description:
            'Achieve restful nights with our personalized sleep consultation services. We work with families to develop gentle sleep plans that respect your baby individual needs and your parenting philosophy. Wether you aredealing with early rising, frequent night wakings, short naps, or difficulty falling asleep independently, we provide evidence-based strategies and ongoing support to foster healthy, long-lasting sleep habits for your little one ',
    },
    {
        icon: 'bi-cup-straw', // consider switching to a diaper icon if you like
        title: 'Infant Feeding & Diaper Support',
        description: `Comprehensive feeding and diapering care: 
        Expert guidance on breastfeeding latch, bottle preparation & pump usage.  
        Hands‑on diaper changes using gentle, rash‑preventing techniques.  
        Skin‑to‑skin and soothing strategies to calm and comfort. 
        Sterilization best practices and hygienic care for healthy skin.  
        Personalized tips to keep your baby nourished, clean & content.
  `.trim(),
    },
    {
        icon: 'bi-people-fill',
        title: 'Sibling Adjustments',
        description:
            'Gentle, age‑appropriate strategies to help older siblings welcome the new baby.',
    },
    {
        icon: 'bi-brightness-high-fill',
        title: 'Overnight Care',
        description:
            'Peace of mind with overnight support—let yourself rest while we tend to your newborn’s needs.',
    },
    {
        icon: 'bi-arrow-repeat',
        title: 'Infant Laundry',
        description:
            'Laundry care for all those tiny outfits—clean, dry, and folded, ready for baby’s next adventure.',
    },
];

export default function Services() {
    return (
        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-2">Our Services</h2>
                <p className="text-center text-muted mb-5">
                    Comprehensive newborn & postpartum care tailored to your family.
                </p>

                <div className="row g-4">
                    {services.map((svc, idx) => (
                        <div key={idx} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body text-center">
                                    <i className={`bi ${svc.icon} fs-1 text-primary mb-3`}></i>
                                    <h5 className="card-title">{svc.title}</h5>
                                    <p className="card-text text-muted">{svc.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5">
                    <Link to="/contact" className="btn btn-outline-primary btn-lg">
                        Inquire About a Service
                    </Link>
                </div>
            </div>
        </section>
    );
}
