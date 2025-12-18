// src/pages/AdminTestimonials.jsx
import React, { useEffect, useMemo, useState } from "react";

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

export default function AdminTestimonials() {
    const [adminKey, setAdminKey] = useState("");
    const [items, setItems] = useState([]);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const [filter, setFilter] = useState("all"); // all | pending | approved | rejected

    const filtered = useMemo(() => {
        if (filter === "all") return items;
        return items.filter((t) => t.status === filter);
    }, [items, filter]);

    async function loadAll() {
        if (!adminKey) {
            setMsg("Enter your admin key first.");
            return;
        }
        setLoading(true);
        setMsg("");

        try {
            const res = await fetch("/.netlify/functions/admin-testimonials-all", {
                headers: { "x-admin-key": adminKey },
            });
            const data = await res.json();

            if (!res.ok) {
                setItems([]);
                setMsg(data?.error || "Unauthorized");
                return;
            }

            setItems(Array.isArray(data) ? data : []);
        } catch {
            setItems([]);
            setMsg("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function setStatus(id, status) {
        if (!adminKey) return;

        const res = await fetch("/.netlify/functions/admin-testimonials-status", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-admin-key": adminKey,
            },
            body: JSON.stringify({ id, status }),
        });

        const data = await res.json();
        if (!res.ok) {
            setMsg(data?.error || "Failed to update status.");
            return;
        }
        loadAll();
    }

    async function deleteTestimonial(id) {
        if (!adminKey) return;

        const ok = window.confirm("Delete this testimonial permanently?");
        if (!ok) return;

        const res = await fetch(`/.netlify/functions/admin-testimonials-delete?id=${id}`, {
            method: "DELETE",
            headers: { "x-admin-key": adminKey },
        });

        const data = await res.json();
        if (!res.ok) {
            setMsg(data?.error || "Failed to delete testimonial.");
            return;
        }
        loadAll();
    }

    // Optional: auto-load if you saved the key in sessionStorage last time
    useEffect(() => {
        const saved = sessionStorage.getItem("gcns_admin_key");
        if (saved) setAdminKey(saved);
    }, []);

    useEffect(() => {
        if (adminKey) sessionStorage.setItem("gcns_admin_key", adminKey);
    }, [adminKey]);

    return (
        <div className="container py-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <div>
                    <h2 className="mb-0">Admin: Testimonials</h2>
                    <div className="text-muted" style={{ fontSize: 14 }}>
                        Manage pending/approved/rejected + delete.
                    </div>
                </div>

                <button className="btn btn-outline-secondary" onClick={loadAll} disabled={loading}>
                    {loading ? "Loading..." : "Load / Refresh"}
                </button>
            </div>

            {msg && <div className="alert alert-warning">{msg}</div>}

            <div className="card p-3 mb-3">
                <label className="form-label">Admin Key</label>
                <input
                    className="form-control"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Paste ADMIN_KEY here"
                />
                <div className="form-text">
                    Keep this private. Anyone with this key can manage testimonials.
                </div>
            </div>

            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                <span className="text-muted">Filter:</span>
                <select
                    className="form-select"
                    style={{ maxWidth: 220 }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>

                <span className="text-muted ms-2">
                    Total: {items.length} / Showing: {filtered.length}
                </span>
            </div>

            {!filtered.length ? (
                <p className="text-muted">No testimonials found.</p>
            ) : (
                <div className="row g-3">
                    {filtered.map((t) => (
                        <div key={t.id} className="col-12 col-lg-6">
                            <div className="card p-3 shadow-sm">
                                <div className="d-flex justify-content-between align-items-start gap-2">
                                    <div>
                                        <div className="fw-semibold">{t.name}</div>
                                        <Stars value={t.rating} />
                                    </div>
                                    <span
                                        className={`badge ${t.status === "approved"
                                                ? "text-bg-success"
                                                : t.status === "rejected"
                                                    ? "text-bg-danger"
                                                    : "text-bg-secondary"
                                            }`}
                                    >
                                        {t.status}
                                    </span>
                                </div>

                                <p className="mt-2 mb-3">“{t.message}”</p>

                                <div className="d-flex flex-wrap gap-2">
                                    <button className="btn btn-success btn-sm" onClick={() => setStatus(t.id, "approved")}>
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => setStatus(t.id, "rejected")}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => setStatus(t.id, "pending")}
                                    >
                                        Set Pending
                                    </button>

                                    <div className="ms-auto">
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteTestimonial(t.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="text-muted mt-2" style={{ fontSize: 12 }}>
                                    Created: {t.created_at ? new Date(t.created_at).toLocaleString() : "—"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
