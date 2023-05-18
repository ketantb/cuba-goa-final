const router = require("express").Router();

const Aboutus = require("../models/aboutus")

router.post("/about-us", async (req, res) => {
    try{
        const { id } = req.params
        const newAboutUs = await Aboutus.create(req.body);
        console.log(newAboutUs)
        res.json({ success: 'success', data: newAboutUs });
      } 
      catch (error) {
        res.status(500).json({ message: error.message });
      }
})

router.get("/about-us", async(req, res) => {
    try{
        const data = await Aboutus.find();
        res.status(200).json({data: data});
    }
    catch(err){
        res.status(500).json({ message: error.message });
    }
})

router.put("/about-us", async (req, res) => {
    try{
        const { id } = req.params
        const updatedAboutUs = await Aboutus.findByIdAndUpdate(id, req.body);
        if(!updatedAboutUs){
            return res.status(404).json({ message: `cannot find any data with id: ${id}` });
        }
        else{
            return res.status(200).json({ message: `success`, data: updatedAboutUs});
        }
      } 
      catch (error) {
        res.status(500).json({ message: error.message });
      }
})

module.exports = router;