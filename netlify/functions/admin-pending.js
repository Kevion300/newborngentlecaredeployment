const { Client } = require("pg");

exports.handler = async (event) => {
    const key = event.headers["x-admin-key"];
    if (!key || key !== process.env.ADMIN_KEY) {
        return {
            statusCode: 401,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Unauthorized" }),
        };
    }

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    try {
        const { rows } = await client.query(
            `SELECT id, name, rating, message, status, created_at
       FROM testimonials
       WHERE status='pending'
       ORDER BY created_at DESC`
        );

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rows),
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Server error" }),
        };
    } finally {
        await client.end();
    }
};
