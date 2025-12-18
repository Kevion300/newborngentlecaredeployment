import React, { useEffect, useState } from "react";

function Stars({ value }) {
    return (
        <div className="mb-2" aria-label={`${value} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <span
                    key={n}
                    className={n <= value ? "text-warning" : "text-secondary"}
                    style={{ fontSize: "1.1rem" }}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default function Testimonials() {
    const [approved, setApproved] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState("");
    const [statusMsg, setStatusMsg] = useState("");

    async function loadApproved() {
        setLoading(true);
        try {
            const res = await fetch("/.netlify/functions/testimonials-get");
            const data = await res.json();
            setApproved(Array.isArray(data) ? data : []);
        } catch {
            setApproved([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadApproved();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setStatusMsg("");

        const res = await fetch("/.netlify/functions/testimonials-submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, rating, message }),
        });

        const data = await res.json();
        if (!res.ok) {
            setStatusMsg(data?.error || "Something went wrong.");
            return;
        }

        setStatusMsg("✅ Thank you! Your testimonial was submitted and is pending approval.");
        setName("");
        setRating(5);
        setMessage("");
    }

    return (
        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-4">What Our Clients Say</h2>

                {/* Submit form */}
                <div className="card p-4 mb-5 shadow-sm">
                    <h5 className="mb-3">Leave a Testimonial</h5>

                    {statusMsg && <div className="alert alert-info">{statusMsg}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label">Your name</label>
                                <input
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label">Rating</label>
                                <select
                                    className="form-select"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                >
                                    {[5, 4, 3, 2, 1].map((n) => (
                                        <option key={n} value={n}>
                                            {n} star{n > 1 ? "s" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Message</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                                <div className="form-text">Your testimonial will appear after approval.</div>
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Approved testimonials */}
                {loading ? (
                    <p>Loading testimonials…</p>
                ) : (
                    <div className="row g-4">
                        {approved.map((t) => (
                            <div key={t.id} className="col-12 col-md-6 col-lg-4">
                                <div className="card p-4 h-100 shadow-sm">
                                    <Stars value={t.rating} />
                                    <p className="mb-3">“{t.message}”</p>
                                    <h6 className="mb-0 text-primary">— {t.name}</h6>
                                </div>
                            </div>
                        ))}
                        {!approved.length && <p className="text-muted">No approved testimonials yet.</p>}
                    </div>
                )}
            </div>
        </section>
    );
}
