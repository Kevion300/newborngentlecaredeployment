// netlify/functions/admin-testimonials-status.js
const { Client } = require("pg");

function getAdminKey(event) {
    // Netlify header keys can vary in casing
    const h = event.headers || {};
    return (
        h["x-admin-key"] ||
        h["X-Admin-Key"] ||
        h["x-admin-key".toLowerCase()] ||
        h["X-ADMIN-KEY"] ||
        ""
    );
}

exports.handler = async (event) => {
    // Handle preflight (PATCH + custom headers can trigger OPTIONS)
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type, x-admin-key",
                "Access-Control-Allow-Methods": "PATCH, OPTIONS",
            },
            body: "",
        };
    }

    if (event.httpMethod !== "PATCH") {
        return {
            statusCode: 405,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    const key = getAdminKey(event);
    if (!key || key !== process.env.ADMIN_KEY) {
        return {
            statusCode: 401,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Unauthorized" }),
        };
    }

    let body;
    try {
        body = JSON.parse(event.body || "{}");
    } catch {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Invalid JSON body." }),
        };
    }

    const id = Number(body.id);
    const status = body.status;

    if (!Number.isFinite(id) || !["pending", "approved", "rejected"].includes(status)) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Invalid id or status." }),
        };
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();

        // ✅ Updated logic (no CASE WHEN) to avoid NULL/edge issues
        let query;
        let params;

        if (status === "approved") {
            query = `
        UPDATE testimonials
        SET status = $2,
            approved_at = NOW()
        WHERE id = $1
        RETURNING id, status, approved_at
      `;
            params = [id, status];
        } else {
            query = `
        UPDATE testimonials
        SET status = $2,
            approved_at = NULL
        WHERE id = $1
        RETURNING id, status, approved_at
      `;
            params = [id, status];
        }

        const { rows } = await client.query(query, params);

        if (!rows.length) {
            return {
                statusCode: 404,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "Testimonial not found." }),
            };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ok: true, testimonial: rows[0] }),
        };
    } catch (err) {
        console.error("admin-testimonials-status error:", err);

        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Server error updating testimonial." }),
        };
    } finally {
        try {
            await client.end();
        } catch { }
    }
};
