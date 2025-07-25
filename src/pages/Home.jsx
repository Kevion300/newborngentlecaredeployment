import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [flipped, setFlipped] = useState(false);
    const navigate = useNavigate();

    const handleWelcome = () => {
        // start the flip
        setFlipped(true);
        // after animation (600ms), go to About page
        setTimeout(() => navigate('/about'), 600);
    };

    return (
        <div className={`cover-page${flipped ? ' flipped' : ''}`}>
            <h1 className="cover-title"> GENTLE CARE NEWBORN SPECIALISTS</h1>
            <img
                src="/cover-image.png"
                alt="Gentle Care cover"
                className="cover-image"
            />
            <button
                className="btn btn-light cover-button"
                onClick={handleWelcome}
            >
                Welcome
            </button>
        </div>
    );
}
