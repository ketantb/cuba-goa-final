const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel')

router.get('/get-client-details/:id', async (req, res) => {
  console.log(req.params.id)
  try{
    const clientData = await Client.find({ _id: req.params.id}); 
    res.status(200).json({ data: clientData });
  }
  catch(err){
    res.status(500).send(err);
  }
})

module.exports = router;  