const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Detail = require('../model/Detail');
const { body, validationResult } = require('express-validator');


// Route 1: Get All the details using: GET "/api/details/fetchalldetails". Login required
router.get('/fetchalldetails', fetchuser, async (req, res) => {
    try {
        const detail = await Detail.find({ user: req.user.id });
        res.json(detail)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Route 2: adding a new Details using: POST "/api/details/adddetails". Login required
router.post('/adddetails', fetchuser, [
    body("name", "Name must be atleast 3 character long").isLength({ min: 3 }),
    body("lastName", "Last Name must be atleast 3 character long").isLength({ min: 3 }),
    body("jobTitle", "Job Title must be atleast 4 character long").isLength({ min: 4 }),
    body("address", "Address must be atleast 6 character long").isLength({ min: 6 }),
    body("city", "City Name must be atleast 4 character long").isLength({ min: 4 }),
    body("state", "State Name must be atleast 4 character long").isLength({ min: 4 }),
    body("zipCode", "Enter a valid Zip Code").isLength({min: 5}),
    body("phone", "Enter a valid Phone Number").isLength({min: 10}),
    body("email", "Enter a valid Email").isEmail(),
], async (req, res) => {
    try {
        const { name, lastName, jobTitle, address, city, state, zipCode, phone, email } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const detail = new Detail({
            name, 
            lastName, 
            jobTitle, 
            address, 
            city, 
            state, 
            zipCode, 
            phone, 
            email, 
            user: req.user.id
        });
        const saveDetail = await detail.save()

        res.json(saveDetail)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//ROUTE 3: Update an existing Note using: PUT "/api/details/updatedetails/:id". Login required
router.put("/updatedetails/:id", fetchuser, async (req, res) => {
    const { name, lastName, jobTitle, address, city, state, zipCode, phone, email } = req.body;
    try{
    // Create a newNote object
    const newDetail = {};
    if (name) {
      newDetail.name = name;
    }
    if (lastName) {
      newDetail.lastName = lastName;
    }
    if (jobTitle) {
      newDetail.jobTitle = jobTitle;
    }
    if (address) {
      newDetail.address = address;
    }
    if (city) {
      newDetail.city = city;
    }
    if (state) {
      newDetail.state = state;
    }
    if (zipCode) {
      newDetail.zipCode = zipCode;
    }
    if (phone) {
      newDetail.phone = phone;
    }
    if (email) {
      newDetail.email = email;
    }
  
    //Find the detail to be update and update it
    let detail = await Detail.findById(req.params.id);
  
    if (!detail) {
      return res.status(404).send("Not Found");
    }
  
    if (detail.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
  
    detail = await Detail.findByIdAndUpdate(
      req.params.id,
      { $set: newDetail },
      { new: true }
    );
  
    res.json({ "Success": "Details has been updated" , detail: detail });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  //ROUTE 4: Delete an existing Detail using: DELETE "/api/details/deletedetails/:id". Login required
  router.delete("/deletedetails/:id", fetchuser, async (req, res) => {
    try{
    //Find the note to be delete and delete it
    let detail = await Detail.findById(req.params.id);
  
    if (!detail) {
      return res.status(404).send("Not Found");
    }
  
    //Allow deletion only if user owns this detail
    if (detail.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
  
    detail = await Detail.findByIdAndDelete(
      req.params.id)
  
    res.json({ "Success": "Note has been deleted", detail: detail});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;