const SimCard = require("../models/SimCard");

const activateSimCard = async (req, res) => {
    const { simNumber } = req.body;

    if (!simNumber) {
        return res.status(400).json({ error: 'SIM number is required' });
    }

    try {
        let sim = await SimCard.findOne({ simNumber });
        if (sim) {
            if (sim.status === 'active') {
                return res.status(400).json({ message: 'SIM is already active' });
            }
            sim.status = 'active';
            sim.activationDate = new Date();
        } else {
            sim = new SimCard({
                simNumber,
                status: 'active',
                activationDate: new Date()
            });
        }
        await sim.save();
        return res.status(200).json({ message: 'SIM activated successfully', sim });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const deactivateSimCard = async (req, res) => {
    const { simNumber } = req.body;

    if (!simNumber) {
        return res.status(400).json({ error: 'SIM number is required' });
    }

    try {
        let sim = await SimCard.findOne({ simNumber });
        if (!sim) {
            return res.status(404).json({ message: 'SIM not found' });
        }

        if (sim.status === 'inactive') {
            return res.status(400).json({ message: 'SIM is already inactive' });
        }

        sim.status = 'inactive';
        await sim.save();
        return res.status(200).json({ message: 'SIM deactivated successfully', sim });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getSimCardDetails = async (req, res) => {
    const { simNumber } = req.params;

    try {
        const sim = await SimCard.findOne({ simNumber });
        if (!sim) {
            return res.status(404).json({ message: 'SIM not found' });
        }
        return res.status(200).json(sim);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
 
module.exports = {
    activateSimCard,
    deactivateSimCard,
    getSimCardDetails
}