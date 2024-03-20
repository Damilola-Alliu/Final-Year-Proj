const pool = require('../db');


async function createServiceProviderTable()  {
    const query = `
    CREATE TABLE IF NOT EXISTS service_provider (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) REFERENCES users(email),
        profile_photo VARCHAR(255),
        location VARCHAR(255),
        provided_services TEXT[],
        hourly_rate INTEGER,
        availability_calendar JSONB
    )
    `;
    
    try {
        await pool.query(query);
        console.log("Service Provider table created successfully");
    } catch (error) {
        console.error("Error creating service provider table:", error);
    }
}
