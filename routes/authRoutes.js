/* Routes for auth */
const express = require('express');
const router = express.Router();

/* Lägg till användare */
router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;

        /* Validering */
        if (!username || !password ){ 
            return res.status(400).json({ error: 'Invalid input, send username and password'});
        }

        /* Spara användare */
        res.status(201).json({ message: 'User created'})

    } catch (error) {
        res.status(500).json({ error: 'Server error' + error});
    }
});

/* Logga in användare */
router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;

        /* Validering */
        if (!username || !password ){ 
            return res.status(400).json({ error: 'Invalid input, send username and password'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error'});
    }
});

module.exports = router;