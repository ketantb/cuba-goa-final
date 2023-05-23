const router = require("express").Router();

const Booking = require("../models/booking")

router.get("/get-all-bookings", async (req, res) => {
    try{
        const allBookingList = await Booking.find();
        res.status(200).json({data: allBookingList})
    }
    catch(err){
        res.status(500).json({message: err})
    }
})

module.exports = router;