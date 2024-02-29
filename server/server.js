const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')
const User = require('./models/Users')
const jwt = require('jsonwebtoken')

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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user from the database based on email
        const user = await User.getUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        console.log('User email:', user.email)
        console.log('User role:', user.role)
        console.log('User firstname:', user.firstname)
        console.log('User lastname:', user.lastname)
        console.log('User phoneNumber:', user.phonenumber)

        const token = jwt.sign({
            email: user.email, 
            role: user.role, 
            firstname: user.firstname, 
            lastname: user.lastname,
            phoneNumber: user.phoneNumber
        }, 

            'strong_random_secret', { expiresIn: '1h' });

        // Return user role and token if login is successful
        res.json({ role: user.role, token, firstname: user.firstname, lastname: user.lastname, email: user.email, phonenumber: user.phonenumber });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/protected', verifyToken, (req, res) => {
    res.json(req.user);
})


app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))