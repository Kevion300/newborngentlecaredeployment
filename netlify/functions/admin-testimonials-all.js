const { Client } = require("pg");

function requireAdmin(event) {
    const key = event.headers["x-admin-key"];
    return key && key === process.env.ADMIN_KEY;
}

exports.handler = async (event) => {
    if (!requireAdmin(event)) {
        return { statusCode: 401, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    try {
        const { rows } = await client.query(
            `SELECT id, name, rating, message, status, created_at, approved_at
       FROM testimonials
       ORDER BY created_at DESC`
        );

        return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(rows) };
    } catch (err) {
        console.error("admin-testimonials-all error:", err);
        return { statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Server error" }) };
    } finally {
        await client.end();
    }
};
