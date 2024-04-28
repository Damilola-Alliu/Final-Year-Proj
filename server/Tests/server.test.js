const request = require('supertest');
const { app, startServer, closeServer } = require('../server'); // Import app and server functions

const TEST_PORT = 8001; // Define a different port for testing

beforeAll(async () => {
  try {
    await startServer(TEST_PORT);
    console.log(`Test server running on PORT ${TEST_PORT}`);
  } catch (err) {
    console.error('Error starting test server:', err);
    throw err; // Rethrow the error to fail the test suite
  }
});

afterAll(async () => {
  try {
    await closeServer();
    console.log('Test server closed');
  } catch (err) {
    console.error('Error closing test server:', err);
    throw err; // Rethrow the error to fail the test suite
  }
});

describe('POST /login', () => {
  it('should return an error for invalid credentials', async () => {
    const invalidUserData = {
      email: 'invalid@example.com',
      password: 'invalidPassword'
    };

    // Make a POST request to /login endpoint with invalid user data
    const response = await request(app)
      .post('/login')
      .send(invalidUserData);

    // Assert that the response status is 400 and contains the error message
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid email or password');
  });
});

// Add more test cases as needed
