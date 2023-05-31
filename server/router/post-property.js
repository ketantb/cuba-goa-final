
require("dotenv").config();

const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const HotelBook = require("../models/post-property");
const adminMiddleware = require('../middleware/admin')

const secretKey = process.env.RAZOR_SECRET;
const keyId = process.env.RAZOR_KEYID;

const instance = new Razorpay({
  key_id: keyId,
  key_secret: secretKey,
});




router.post("/hotelbook", adminMiddleware, async (req, res) => {
  try {
    const resortData = await HotelBook.create(req.body);
    // console.log(resortData)
    res.json({ success: true, data: resortData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//GET DATA OF SPECIFIC OWNER (login required)
router.get('/my-resorts',adminMiddleware,(req,resp)=>{

})



//GET ALL HOTEL DATA TO SHOW TO CLIENTS
router.get("/hotelbook", async (req, res) => {
  try {
    const hotelBook = await HotelBook.find({});
    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(5009).json({ message: error.message });
  }
});



//GET SPECIFIC HOTEL BY ID
router.get("/resort-details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resortData = await HotelBook.find({_id:id});
    res.json({success:true,resortData:resortData});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//to update only rooms by id
router.put("/hotelbook/:id", adminMiddleware, async (req, res) => {
  console.log(req.params.id)
  // res.json({message: req.body})
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndUpdate(id, {rooms: req.body.rooms});
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }
    const updatedHotelBook = await HotelBook.findById(id);
    res.status(200).json(updatedHotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//to update whole Resort by id
router.put("/entire-hotelbook/:id", adminMiddleware, async (req, res) => {
  // console.log(req.params.id)
  // res.json({message: req.body})
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndUpdate(id, req.body);
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }
    const updatedHotelBook = await HotelBook.findById(id);
    res.status(200).json(updatedHotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// delete a hotel Book
router.delete("/hotelbook/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndDelete(id, req.body);
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }

    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update total rooms in DB after booking
router.patch("/updateTotalRoomsinDb/:id", adminMiddleware, async (req, res) => {
  try {
    // console.log(req.params.id)
    // const name = req.body.resort.resortName
    // console.log(req.body.resort.resortName)
    // const room = await HotelBook.find({resortName: name});
    // console.log(room)
    let acknowledged = false
    for (let i = 0; i < req.body.length; i++) {
      acknowledged = false;
      console.log("ROOM", i, "=>")
      const _id = req.body[i].room._id
      const updatedAvailableRooms = req.body[i].room.availableRooms
      let ack
      const roomUpdated = await HotelBook.updateOne({
        "rooms._id": _id
      },
        {
          "$set": {
            "rooms.$.availableRooms": updatedAvailableRooms
          }
        })
      acknowledged = roomUpdated.acknowledged
      console.log(roomUpdated)
    }
    if (acknowledged == true) {
      res.status(200).json({
        message: "Total Rooms Data Updated Successfully"
      })
    }else{
      res.status(200).json({
        message: "Total Rooms Data Updation Failed"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message, status: false });
  }
})






module.exports = router;
