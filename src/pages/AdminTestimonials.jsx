import React, { useState } from "react";

export default function AdminTestimonials() {
    const [adminKey, setAdminKey] = useState("");
    const [pending, setPending] = useState([]);
    const [msg, setMsg] = useState("");

    async function loadPending() {
        setMsg("");
        const res = await fetch("/.netlify/functions/admin-pending", {
            headers: { "x-admin-key": adminKey },
        });
        const data = await res.json();

        if (!res.ok) {
            setPending([]);
            setMsg(data?.error || "Unauthorized");
            return;
        }
        setPending(Array.isArray(data) ? data : []);
    }

    async function approve(id) {
        await fetch(`/.netlify/functions/admin-approve?id=${id}`, {
            method: "PATCH",
            headers: { "x-admin-key": adminKey },
        });
        loadPending();
    }

    async function reject(id) {
        await fetch(`/.netlify/functions/admin-reject?id=${id}`, {
            method: "PATCH",
            headers: { "x-admin-key": adminKey },
        });
        loadPending();
    }

    return (
        <div className="container py-5">
            <h2 className="mb-3">Admin: Testimonial Approvals</h2>

            <div className="card p-3 mb-4">
                <label className="form-label">Admin Key</label>
                <div className="d-flex gap-2">
                    <input
                        className="form-control"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        placeholder="Paste ADMIN_KEY here"
                    />
                    <button className="btn btn-dark" onClick={loadPending}>
                        Load Pending
                    </button>
                </div>
                {msg && <div className="alert alert-warning mt-3 mb-0">{msg}</div>}
            </div>

            {!pending.length ? (
                <p className="text-muted">No pending testimonials.</p>
            ) : (
                <div className="row g-3">
                    {pending.map((t) => (
                        <div key={t.id} className="col-12 col-lg-6">
                            <div className="card p-3 shadow-sm">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="mb-1">{t.name}</h6>
                                        <div className="text-warning">
                                            {"★★★★★".slice(0, t.rating)}
                                            <span className="text-secondary">
                                                {"★★★★★".slice(t.rating)}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="badge text-bg-secondary">{t.status}</span>
                                </div>

                                <p className="mt-3 mb-3">“{t.message}”</p>

                                <div className="d-flex gap-2">
                                    <button className="btn btn-success" onClick={() => approve(t.id)}>
                                        Approve
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={() => reject(t.id)}>
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
