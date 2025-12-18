const { Client } = require("pg");

function requireAdmin(event) {
    const key = event.headers["x-admin-key"];
    return key && key === process.env.ADMIN_KEY;
}

exports.handler = async (event) => {
    if (!requireAdmin(event)) {
        return { statusCode: 401, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    if (event.httpMethod !== "DELETE") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const id = Number(event.queryStringParameters?.id);
    if (!id) {
        return { statusCode: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Missing id." }) };
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    try {
        await client.query(`DELETE FROM testimonials WHERE id=$1`, [id]);
        return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: true }) };
    } catch (err) {
        console.error("admin-testimonials-delete error:", err);
        return { statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Server error" }) };
    } finally {
        await client.end();
    }
};
