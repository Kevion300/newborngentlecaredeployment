const { Client } = require("pg");

exports.handler = async () => {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    try {
        const { rows } = await client.query(
            `SELECT id, name, rating, message, created_at
       FROM testimonials
       WHERE status='approved'
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
