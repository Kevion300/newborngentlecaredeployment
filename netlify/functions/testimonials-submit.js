const { Client } = require("pg");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body || "{}");
    const name = (body.name || "").trim();
    const message = (body.message || "").trim();
    const rating = Number(body.rating);

    if (!name || !message) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Name and message are required." }),
        };
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Rating must be 1–5." }),
        };
    }

    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();

    try {
        const { rows } = await client.query(
            `INSERT INTO testimonials (name, rating, message, status)
       VALUES ($1, $2, $3, 'pending')
       RETURNING id, status`,
            [name, rating, message]
        );

        return {
            statusCode: 201,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ok: true,
                message: "Thanks! Your testimonial is pending approval.",
                testimonial: rows[0],
            }),
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
