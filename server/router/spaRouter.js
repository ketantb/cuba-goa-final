const express = require("express");
const adminMiddleware = require('../middleware/admin')
const router = express.Router()
const Spa = require("../models/spa");

// spa

router.post("/addspa", adminMiddleware, async (req, res) => {
  try {
    const spa = await Spa.create(req.body);
    res.status(200).json(spa);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//get all spa details
router.get("/allSpaList", async (req, resp) => {
  const spaList = await Spa.find();
  try {
    if (spaList) {
      resp.json({ success: true, data: spaList });
    } else {
      resp.json({ success: false, data: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

//get details of spa

router.get("/spaDetails/:id", async (req, resp) => {
  const id = req.params.id;
  try {
    const dataDetails = await Spa.findOne({ _id: id });
    if (dataDetails) {
      console.log(dataDetails);
      resp.json({ success: true, data: dataDetails });
    } else {
      resp.status(404).json({ success: false, data: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    resp.status(500).json({ success: false, data: "Internal Server Error" });
  }
});

router.delete("/delete/spa/:id", adminMiddleware, async (req, res) => {
  try{
    const deletedSpa = await Spa.findByIdAndDelete(req.params.id)
    if(deletedSpa){
      res.status(200).json({message: "spa deleted successfully"})
    }
    else{
      res.status(200).json({message: `cannot find any Spa with ${req.params.id}`})
    }
  }
  catch(err){
    res.status(400).json({message: err})
  }
})

//to update Spa by id
router.put("/spa/:id", adminMiddleware, async (req, res) => {
  console.log(req.params.id)
  // res.json({message: req.body})
  try {
    const { id } = req.params;
    const updateSpa = await Spa.findByIdAndUpdate(id, req.body);
    //we cannot find any product in database
    if (!updateSpa) {
      return res
        .status(404)
        .json({ message: `cannot find any Spa with ${id}` });
    }
    else{
      const updatedSpa = await Spa.findById(id)
      console.log(updatedSpa)
      res.status(200).json({ message: updatedSpa })
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;