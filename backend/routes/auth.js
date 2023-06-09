const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "ResumeBuilder"; //Signature for webtoken


//Route 1 : Create a user using: POST "/api/auth/createUser". No login required
router.post('/createUser', [
    body('name', "Enter a valid Name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password atleast mustbe 5 character").isLength({ min: 5 }),
    body("phone", "phone number must be length of 10").isLength({ min: 10 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            phone: req.body.phone,
            gender: req.body.gender
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({success, authtoken});

        // Catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



//Route 2 : Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;  // destructuring
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct Credentials" });
        }

        // This for the comparison of password
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct Credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3 : Get loggedin User Details using: POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router