/* Variabler */
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

/* Routes */
app.use('/api', authRoutes);

/* Skyddad route */
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Skyddad route'})
})

/* Validera token */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({error: 'Du har inte behörighet för detta, token saknas.'})

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ error: 'Ogiltig JWT'});

        req.username = username;
        next();
    })
}


/* Lyssna på port */
app.listen(port, () => {
    console.log(`Server running at port:${port}`);
});