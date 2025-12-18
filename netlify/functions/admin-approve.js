const { Client } = require("pg");

exports.handler = async (event) => {
    const key = event.headers["x-admin-key"];
    if (!key || key !== process.env.ADMIN_KEY) {
        return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    if (event.httpMethod !== "PATCH") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { id } = event.queryStringParameters || {};
    if (!id) return { statusCode: 400, body: JSON.stringify({ error: "Missing id" }) };

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    try {
        const { rows } = await client.query(
            `UPDATE testimonials
       SET status='approved', approved_at=NOW()
       WHERE id=$1
       RETURNING id, status`,
            [Number(id)]
        );

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ok: true, testimonial: rows[0] }),
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
    } finally {
        await client.end();
    }
};
