const express = require('express');
const router = express.Router();
const { activateSimCard, deactivateSimCard, getSimCardDetails } = require('../controllers/simController');
const SimCard = require("../models/SimCard");

router.post('/addSimcard', async (req, res) => {
    try {

        const { simNumber, status, activationDate } = req.body;

        const newSimCard = new SimCard({
            simNumber,
            status,
            activationDate
        });

        await newSimCard.save();
        res.status(201).json({
            message: 'SIM card added successfully',
            simCard: newSimCard
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.post('/activate', activateSimCard);

router.post('/deactivate', deactivateSimCard);


router.get('/sim-details/:simNumber', getSimCardDetails);

module.exports = router;
