/* Routes for auth */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

/* Anslut till databas (mongodb) */
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log(`Failed to connect to database: ${error}`);
});

/* User model */
const User = require('../models/User');


/* Lägg till användare */
router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;

        /* Validering */
        if (!username || !password ){ 
            return res.status(400).json({ error: 'Invalid input, send username and password'});
        }

        /* Spara användare */
        const user = new User({ username, password});
        await user.save();
        res.status(201).json({ message: 'User created'})

    } catch (error) {
        res.status(500).json({ error: 'Server error' + error});
    }
});

/* Logga in användare */
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        /* Validering */
        if (!username || !password ){ 
            return res.status(400).json({ error: 'Invalid input, send username and password'});
        }

        /* Kontrollera om användare existerar */
        const user = await User.findOne({username});
        if(!user) {
            return res.status(401).json({ error: 'Fel användarnamn/lösenord'})
        }

        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error:'Fel användarnamn/lösenord'})
        } else {
            res.status(200).json({ message: 'User logged in!'})
        }

    } catch (error) {
        res.status(500).json({ error: 'Server error'});
    }
});

module.exports = router;