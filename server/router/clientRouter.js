const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/admin')
const Client = require('../models/client-registration')
const nodemailer = require('nodemailer');
require('dotenv').config();


router.get('/get-all-clients', adminMiddleware, async (req, res) => {
  try {
    const allClients = await Client.find();
    res.status(200).json({ data: allClients });
  }
  catch (err) {
    res.status(500).send(err);
  }
})

router.get('/get-client-details/:id', adminMiddleware, async (req, res) => {
  console.log(req.params.id)
  try {
    const clientData = await Client.find({ _id: req.params.id });
    res.status(200).json({ data: clientData });
  }
  catch (err) {
    res.status(500).send(err);
  }
})


router.post('/rejection-mail', adminMiddleware, async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
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
    res.status(401).json({message: err})
  }
})

module.exports = router;  