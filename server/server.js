const PORT = process.env.PORT ?? 8000;
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pool = require('./db');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const {saveMessage, getMessages, getCustomerMessages} = require('./models/Messages')

const { getUserByEmail, createUser } = require('./models/Users');
const {getServiceProviders} = require('./models/ServiceProvider')
const {getAllServiceProviders} = require('./models/ServiceProvider')
const User = require('./models/Users')

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(cors());

// Add your existing routes and middleware here

wss.on('connection', (ws) => {
  console.log('A client connected');
  
  ws.on('message', (message) => {
    console.log('Received message:', message);
    
    // Process the message and send a response if needed
    ws.send('Message received!');
  });
  
  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

app.use(express.json());


app.use(cors())


// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    jwt.verify(token, 'strong_random_secret', (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: 'Failed to authenticate token'
            });
        }

        req.user = decoded;
        next();
    });
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'damilolaalliu101@gmail.com',
        pass: 'ueie uobu jnsy djox'
    }
})

async function sendEmail(email, subject, text) {
    try {
        // Send mail with defined transport object
        await transporter.sendMail({
            from: 'damilolaalliu101@gmail.com',
            to: email,
            subject: subject,
            text: text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}



app.get('/test', (req, res) => {
    res.send('Hello Ali!')
})


//get all users
app.get('/users', async (req, res) => {
    console.log(req)
    // const { userEmail } = req.params

    try {
        const users = await pool.query('SELECT * FROM users')
        res.json(users.rows)
    } catch (error) {
        console.log(error)
        
    }
})

app.get('/users/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.rows[0]); // Return the first (and only) user found
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user from the database based on email
        const user = await User.getUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        // console.log('User email:', user.email)
        // console.log('User role:', user.role)
        // console.log('User firstname:', user.firstname)
        // console.log('User lastname:', user.lastname)
        // console.log('User phonenumber:', user.phonenumber)

        const token = jwt.sign({
            email: user.email, 
            role: user.role, 
            firstname: user.firstname, 
            lastname: user.lastname,
            phonenumber: user.phonenumber
        }, 

            'strong_random_secret', { expiresIn: '1h' });

        // Return user role and token if login is successful
        res.json({ role: user.role, token, firstname: user.firstname, lastname: user.lastname, email: user.email, phonenumber: user.phonenumber });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, role, password, phonenumber } = req.body;

        // Check if user with the same email already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create new user if email doesn't exist
        const newUser = await createUser({ firstname, lastname, email, role, password, phonenumber });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// app.get('/api/service-providers', async (req, res) => {
//     try {
//         console.log("Request object:", req);
//         const { query } = req.query; // Retrieve the query parameter
//         console.log("Received search query:", query); // Log the received search query

//         // Fetch service providers based on the search query
//         const serviceProviders = await getServiceProviders(query);
//         console.log("Fetched service providers:", serviceProviders); // Log the fetched service providers

//         // Send the fetched service providers as the response
//         res.json(serviceProviders);
//     } catch (error) {
//         console.error("Error fetching service providers:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


app.get('/service-providers', async (req, res) => {
    try {
        // Fetch all service providers
        const serviceProviders = await getAllServiceProviders();
        res.json(serviceProviders);
        //console.log(serviceProviders)
    } catch (error) {
        console.error("Error fetching service providers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/service-providers/:email', async (req, res) => {
    const { email } = req.params;

    try {
        // Fetch the service provider based on the email
        const serviceProvider = await pool.query('SELECT * FROM service_provider WHERE email = $1', [email]);
        if (serviceProvider.rows.length === 0) {
            return res.status(404).json({ error: 'Service provider not found' });
        }
        res.json(serviceProvider.rows[0]); // Return the first (and only) service provider found
    } catch (error) {
        console.error("Error fetching service provider by email:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/bookings', async (req, res) => {
    try {
        // Extract data from the request body
        const { customerEmail, serviceProviderEmail, date, time, notes, status } = req.body;
        
        // Create a new booking in the database
        const newBooking = await pool.query(
            'INSERT INTO bookings (customer_email, service_provider_email, date, time, notes, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [customerEmail, serviceProviderEmail, date, time, notes, status]
        );

        // Retrieve the email addresses of the customer and service provider
        const customer = await pool.query('SELECT email FROM users WHERE email = $1', [customerEmail]);
        const serviceProvider = await pool.query('SELECT email FROM service_provider WHERE email = $1', [serviceProviderEmail]);

        // Send email to customer
        const customerMessage = 'Your booking has been successful and is awaiting confirmation from the service provider.';
        await sendEmail(customerEmail, 'Booking Successful', customerMessage);

        // Send email to service provider
        const serviceProviderMessage = `You have been booked for a service.
        Please log in to your account to make a decision as quickly as possible.`;
        await sendEmail(serviceProviderEmail, 'New Booking', serviceProviderMessage);

        // Return the newly created booking
        res.status(201).json(newBooking.rows[0]);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});


// Endpoint to get bookings by specific email
app.get('/bookings/service-provider/:email', async (req, res) => {
    const { email } = req.params;
    //console.log(email)

    try {
        // Query the database to get bookings for the specific email
        const bookings = await pool.query('SELECT * FROM bookings WHERE service_provider_email = $1', [email]);

        // Return the bookings
        res.json(bookings.rows);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/bookings/customer_email/:email', async (req, res) => {
    const { email } = req.params;
    console.log(email)

    try {
        // Query the database to get bookings for the specific email
        const bookings = await pool.query('SELECT * FROM bookings WHERE customer_email = $1', [email]);

        // Return the bookings
        res.json(bookings.rows);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// PUT endpoint to accept or decline a booking
app.put('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const { status, declineReason, hoursWorked, email } = req.body;

    try {
        let query;
        let values;
        if (status === 'Job Accepted') {
            query = 'UPDATE bookings SET status = $1 WHERE id = $2';
            values = [status, id];
            // Send email to customer here
            const booking = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
            const customerEmail = booking.rows[0].customer_email;
            await sendEmail(customerEmail, 'Booking Accepted', 'Your booking has been accepted.');
        } else if (status === 'Job Declined') {
            query = 'UPDATE bookings SET status = $1, decline_reason = $2 WHERE id = $3';
            values = [status, declineReason, id];
            // Send email to customer here
            const booking = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
            const customerEmail = booking.rows[0].customer_email;
            await sendEmail(customerEmail, 'Booking Declined', 'Your booking has been declined.');
        } else if (status === 'Job Completed') {
            // Calculate service charge and total charge
            const serviceProviderData = await pool.query('SELECT * FROM service_provider WHERE email = $1', [email]);
            const hourlyRate = serviceProviderData.rows[0].hourly_rate;
            const serviceCharge = hourlyRate * hoursWorked;
            const totalCharge = serviceCharge * 1.2; // Assuming a 20% additional charge
            
            query = 'UPDATE bookings SET status = $1, hours_worked = $2, service_charge = $3, total_charge = $4 WHERE id = $5';
            values = [status, hoursWorked, serviceCharge, totalCharge, id];

            // Send email to customer with invoice breakdown
            const booking = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
            const customerEmail = booking.rows[0].customer_email;
            await sendInvoiceEmail(customerEmail, serviceCharge, totalCharge);
        } else {
            return res.status(400).json({ error: 'Invalid status' });
        }

        await pool.query(query, values);

        res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to send invoice email to customer
const sendInvoiceEmail = async (customerEmail, serviceCharge, totalCharge) => {
    try {
        // Define email content
        const mailOptions = {
            from: 'your_email@example.com',
            to: customerEmail,
            subject: 'Invoice for Service',
            html: `<p>Dear Customer,</p>
                   <p>Your invoice for the service is as follows:</p>
                   <p>Service Charge: $${serviceCharge}</p>
                   <p>Total Charge (including 20% additional charge): $${totalCharge}</p>
                   <p>Thank you for using our service!</p>`
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Invoice email sent successfully');
    } catch (error) {
        console.error('Error sending invoice email:', error);
    }
};



// Handle sending messages
app.post('/messages', async (req, res) => {
    const { senderemail, email, content } = req.body;
    try {
        await saveMessage(senderemail, email, content);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ error: "Failed to save message" });
    }
});

// Handle fetching messages
app.get('/messages', async (req, res) => {
    const { sender_email, email } = req.query;
    try {
        const messages = await getMessages(sender_email, email);
        // console.log(sender_email)
        // console.log(email)
        res.json(messages); 
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

app.get('/messages/customers', async (req, res) => {
    try {
        const customerMessages = await getCustomerMessages();
        res.json(customerMessages);
    } catch (error) {
        console.error("Error fetching customer messages:", error);
        res.status(500).json({ error: "Failed to fetch customer messages" });
    }
});


app.get('/protected', verifyToken, (req, res) => {
    res.json(req.user);
})


app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))