require('dotenv').config()
const router = require("express").Router()
const { response } = require("express")
const clientMiddleware = require('../middleware/customer')
const Booking = require('../models/booking')
const HotelBook = require('../models/post-property')
const moment = require('moment')
const nodemailer = require('nodemailer')


router.post('/booking-form/:resortId/:roomId', clientMiddleware, async (req, resp) => {
  // console.log('client middilware id', req.client)
  console.log(req.clientId)

  console.log('on of rooms', req.body.noOfRooms, typeof (req.body.noOfRooms))
  let checkindate = req.body.checkIn
  let checkoutdate = req.body.checkOut

  //format dates using moment library
  checkindate = moment(checkindate).format('DD/MM/YYYY')
  checkoutdate = moment(checkoutdate).format('DD/MM/YYYY')
  // console.log(checkindate, checkoutdate)
  //ENDS
  // console.log('req.body of booking form=>', req.body)
  const resortId = req.params.resortId
  const roomId = req.params.roomId
  const noOfRooms = parseInt(req.body.noOfRooms)
  try {
    const resort = await HotelBook.findOne({ _id: resortId })
    const getroom = resort.rooms.find(room => room.roomId === roomId)
    // console.log('initial rooms', getroom.availableRooms)
    if (getroom) {
      // console.log('room found', getroom)
      if (getroom.availableRooms === 0) {
        console.log('no room available')
        resp.json({ success: false, message: 'Sorry, no rooms available' })
      }
      else if (getroom.availableRooms < noOfRooms) {
        // console.log(`Only ${getroom.availableRooms} rooms available. Please enter valid on of rooms you want to book`)
        resp.json({ sucees: false, message: `Only ${getroom.availableRooms} rooms available. Please enter valid number of rooms you want to book` })
      }
      else {
        const bookingData = await Booking.create({
          ...req.body,
          checkIn: checkindate,
          checkOut: checkoutdate,
          client: req.clientId
        })

        // console.log('booking data', bookingData)
        resp.json({ success: true, data: bookingData })
      }
    }

  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})



//update room data after booking
router.patch('/update-room/:resortId/:roomId', async (req, resp) => {
  console.log(req.clientId)
  const { resortId, roomId } = req.params
  // console.log(resortId, roomId)
  // console.log(req.body)
  const { noOfRooms } = req.body

  try {
    const resort = await HotelBook.findOne({ _id: resortId })
    const getroom = resort.rooms.find(room => room.roomId === roomId)
    console.log('initial rooms', getroom.availableRooms)
    if (getroom) {
      getroom.availableRooms = parseInt(getroom.availableRooms) - parseInt(noOfRooms)
      console.log('updatedRoom', getroom.availableRooms)
      await resort.save()
      resp.json({ success: true, data: getroom })
    }
    else {
      response.json({ success: true, message: 'no room found' })
    }

  }
  catch (err) {
    resp.json({ success: false, message: err })
  }
})


//send email of booking confirmation
router.post('/send-email', clientMiddleware, async (req, resp) => {
  console.log(req.clientId)
  console.log(req.body.email)
  console.log('=======================')
  console.log(req.body.bookingData)
  console.log("=========================")
  console.log(req.body.resort)
  console.log("======================")
  console.log(req.body.room)
  console.log("=======================")

  console.log(process.env.NODEMAILER_EMAIL, process.env.NODEMAILER_PASSWORD)
  try {
    const { email } = req.body
    console.log(email)
    const resort = await HotelBook.findOne({ _id: req.body.resortId })
    // console.log(resort)

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
      }
    })

    let mailOptions = {
      from: 'harshadaa1997@gmail.com',
      to: email,
      subject: 'Booking Confirmation from Cuba-Goa',
      text: `
      Dear ${req.body.name},
      Your booking has been confirmed,
      Reservation ID: ${req.body.reservationId},
      Resort Name : ${req.body.resortname},
      Room Type:${req.body.roomType},
      No of rooms booked: ${req.body.noOfRooms},
      Check-in Date: ${req.body.checkIn},
      Check-out Date: ${req.body.checkOut},
      Special Requests: ${req.body.specialRequest ? req.body.specialRequest : ' If you have any specific preferences or requirements, such as dietary restrictions or room preferences, please inform us in advance, and we will do our best to accommodate them.'},

      Arrival Time: Kindly let us know your estimated time of arrival so we can prepare to welcome you
      
      Deposit and Payment:
      Amount Paid: Rs. ${req.body.totalAmount},


      Please familiarize yourself with our cancellation and refund policy outlined in our terms and conditions
      Hotel Policy
      - Luxury tax and service tax applicable as per government of India regulations.
      - All prices are subject to availability.
      - Complimentary breakfast (in case the guests are entitled to) will be served as per Breakfast Menu between 08:30 AM to 10:30 AM only.
      - Outside Food and Drinks are strictly not allowed.
      - Washing of clothes in the room is not allowed.
      - You can just pay INR 100 per day and get 10 pieces of clothes washed on daily basis.
      - There will be no refund given if there is no complaint for room informed within 3 hrs of check in.
      - Late checkout charges of INR 300 will be applicable for any checkout after 11:00 am.
      - Security Deposit of INR 1000 to be paid at the time of check in for any damages which is refundable at the time of check out

      Cancellation Policy
      1. Any Cancellation request received up to 15 days prior check in will not attract any cancellation fees. 
      2. Any Cancellation request received from 15 days to 01 days prior to check in will attract 01 night retention charges. 
      3. Any cancellation on the day of check-in will be non refundable. 
      4. No show , early check out will be non refundable. 
      
      Peak Season Cancellation ( 20th December to 5th January) 
      1. Bookings once made will not be NON-REFUNDABLE, NON-AMENDABLE 
      2. Mandatory Gala Dinner Charges will be applicable for any guest staying on 25th Dec and 31st Dec.
      
      Booking Conditions
    - The total price of the reservation will be charged on the day of booking.
    - Any type of extra mattress or child's cot/crib is upon request and needs to be confirmed by management.
    - Supplements are not calculated automatically in the total costs and will have to be paid for separately during your stay.



      Directions: We will provide detailed directions to our hotel to ensure a smooth journey.
      Address: ${resort.resortAddress}, ${resort.pincode}

      Contact Information: Should you have any questions or need assistance before your arrival, 
      please do not hesitate to contact our friendly team at 
      contact number:-${resort.resortPhoneNumber}
      

      We genuinely appreciate your patronage and cannot wait to welcome you to our beautiful establishment!
      
      Warmest regards,
      
      Cuba Goa
      Cuba Goa Reception
      cuba goa helpline number:- ${resort.cubaGoaHelpLineNumber}

    `
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return resp.status(500).json({ error: error })
      } else {
        console.log('Email sent: ' + info.response);
        return resp.status(200).json(info.response);
      }
    });
  }
  catch (err) {
    // console.log(err)
  }
})



//get specific customer all bookings
router.get('/get-bookings', clientMiddleware, async (req, resp) => {
  try {
    const bookingData = await Booking.find({ client: req.clientId }).sort({ $natural: -1 });
    if (bookingData) {
      // console.log(bookingData)
      resp.json({ success: true, list: bookingData })
    } else {
      // console.log('no bookings with this id')
      resp.json({ success: false, message: 'no booking yet' })
    }
  }
  catch (err) {
    resp.json({ success: false, message: `err ${err}` })
  }
})




//get all bookings in admin section
const adminMiddleware = require('../middleware/admin')

router.get("/get-all-bookings", adminMiddleware, async (req, res) => {
  try {
    const allBookingList = await Booking.find();
    res.status(200).json({ data: allBookingList })
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
})





//reject/cancel booking by admin
router.patch("/reject-booking/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedData = await Booking.updateOne({ _id: id }, { $set: { bookingStatus: "rejected" } })
    res.json({ "message": "success", data: updatedData });
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
})


//send mail on rejection

router.post('/rejection-mail', adminMiddleware, async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Apologies for the Cancellation of Your Hotel Booking",
      text: `

      Dear ${req.body.name},
      
      We hope this message finds you well. We are writing to express our sincerest apologies regarding the recent cancellation of your hotel booking at Cuba Goa.
      We understand that you had made the reservation with us for ${req.body.checkIn} to ${req.body.checkOut}, and due to unforeseen circumstances, we were unable to fulfill your reservation as planned. We deeply regret any inconvenience or disappointment this may have caused you.
      At Cuba Goa, we take great pride in providing exceptional service to our valued guests, and it deeply pains us to have fallen short of your expectations on this occasion. Our team has reviewed the circumstances surrounding your booking cancellation, and we are working diligently to identify any areas where we can improve our processes to prevent similar incidents from occurring in the future.
      
      We understand that a cancelled reservation can disrupt your travel plans and cause inconvenience. We genuinely apologize for any inconvenience you may have faced, and we want to assure you that we are taking immediate steps to rectify the situation and make appropriate improvements to prevent such issues in the future.
      We value your patronage and sincerely apologize once again for the inconvenience caused. In an effort to make amends for this unfortunate experience, we would like to offer you a special discount of [X%] on your next booking with us. This discount can be applied when making a reservation directly through our website or by contacting our reservations team. Additionally, our team will be more than happy to assist you in finding alternative accommodations if you plan to visit our area again in the future.
      Should you decide to take advantage of our offer, please reach out to us directly at Cuba-Goa-Contact-Details-@XYZ, and our team will be delighted to assist you in making your next reservation and ensure a seamless experience.
      
      Once again, please accept our heartfelt apologies for any inconvenience caused. We value your continued support and hope to have the opportunity to welcome you as our esteemed guest in the near future.
      
      Warm regards,
      
      XYZ Name
      XYZ Position
      Cuba Goa
      `
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error })
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(201).json(info.response);
      }
    })

  }
  catch (err) {
    console.log(error)
    res.status(401).json({ message: err })
  }
})




module.exports = router

