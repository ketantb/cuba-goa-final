const express = require("express");

const router = express.Router();
const Contactus=require('../models/contactus')

router.post("/contactus", async (req, res) => {
    try {
        const contactus = await Contactus.create(req.body);
        console.log('contact query', contactus)
        res.status(200).json(contactus);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router