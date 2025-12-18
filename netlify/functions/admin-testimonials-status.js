const { Client } = require("pg");

function requireAdmin(event) {
    const key = event.headers["x-admin-key"];
    return key && key === process.env.ADMIN_KEY;
}

exports.handler = async (event) => {
    if (!requireAdmin(event)) {
        return { statusCode: 401, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    if (event.httpMethod !== "PATCH") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body || "{}");
    const id = Number(body.id);
    const status = body.status;

    if (!id || !["pending", "approved", "rejected"].includes(status)) {
        return { statusCode: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Invalid id or status." }) };
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    try {
        const { rows } = await client.query(
            `UPDATE testimonials
       SET status=$2,
           approved_at = CASE WHEN $2='approved' THEN NOW() ELSE approved_at END
       WHERE id=$1
       RETURNING id, status`,
            [id, status]
        );

        return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: true, testimonial: rows[0] }) };
    } catch (err) {
        console.error("admin-testimonials-status error:", err);
        return { statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Server error" }) };
    } finally {
        await client.end();
    }
};
