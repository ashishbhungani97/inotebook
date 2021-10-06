const express = require('express');
require('dotenv').config()
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');



// ROUTE 1 :  Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('username', 'Enter a valid username').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  // Check whether the user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    var salt = await bcrypt.genSaltSync(10);
    secPass =  await bcrypt.hash(req.body.password,salt);
    // Create a new user
    user = await User.create({
      username: req.body.username,
      password: secPass,
      email: req.body.email,
    })
    var data = {
      user : {
        id : user.id
      }
    }
    var authtoken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({error : "ok" , authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send({error : "Internal Server Error !"});
  }
})


//ROUTE 2 :  Authenticate  a User using: POST "/api/auth/login". No login required

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid Password').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const {email ,password} = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Sorry a user with this email not found !" })
    }

    const passwordCom = await bcrypt.compare(password,user.password);
    
    if(passwordCom == false){
      return res.status(400).json({ error: "Please Enter Valid details !" })
    }

    var data = {
      user : {
        id : user.id
      }
    }
    var authtoken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({error:"OK" , authtoken})

  } catch (error) {
    res.status(500).send({ error : "Internal Server Error !"});
  }

});


//ROUTE 3 :  get User Data using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser ,async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({user})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error !");
  }
});

module.exports = router