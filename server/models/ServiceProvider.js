const pool = require('../db');


async function createServiceroviderTable()  {
    const query = `
    CREATE TABLE IF NOT EXISTS service_provider(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) REFERENCES users(email),
    profile_photo VARCHAR(255),
    provided_services TEXT[],
    hourly_rates JSONB,
    availability_calendar JSONB
    )
    `;
    
    try {
        await pool.query(query);
        console.log("User table created successfully");
    } catch (error) {
        console.error("Error creating user table:", error);
    }
}