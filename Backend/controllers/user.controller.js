const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const bcrypt=require('bcrypt')

module.exports.registerUser = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body); // Debug log

        // Validation of request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password ,branch,batch,contact} = req.body;

        const find=await userModel.findOne({email});
        if(find){
            return res.status(400).send('User already exists');
        }

        // Check if password was provided and hash it
        if (!password) {
            return res.status(400).send('Password is required');
        }

        const hashedPassword = await bcrypt.hash(password,10);
        console.log('Hashed Password:', hashedPassword);  // Debug log for hashed password

        // Call service to create the user
        const user = await userService.createUser(name, email, hashedPassword,branch,batch,contact);
        console.log('User created:', user);  // Debug log for created user
        if (!user) {
            return res.status(400).send('User could not be created');
        }

        // Generate token for the user
        const token = await user.generateAuthToken();
        console.log('Generated Token:', token);  // Debug log for generated token
        if (!token) {
            return res.status(400).send('Token generation failed');
        }

        // Send the response with the created user and token
        res.status(201).send({ user, token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body)
  const { email, password } = req.body;
  console.log(password);
  
  try {
      const user = await userModel.findOne({ email })

      if (!user) {
          return res.status(400).send('User not found');
      }
      console.log('found user',user);
      console.log('Stored Password:', user.password); // Log stored hashed password
      console.log('Attempted Password:', password);  // Log attempted plain text password

      //const isMatch = await user.comparePassword(password);
      
        const isMatch=await bcrypt.compare(password,user.password);
        console.log(isMatch)
        if(!isMatch){
            return res.status(401).send('Invalid password');
        }
        const token=user.generateAuthToken();
        res.cookie('token',token);

        return res.status(200).send({user,token});

     
  } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('Internal Server Error');
  }
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).send(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');
        
        res.status(200).send('Logged out successfully');
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).send('Internal Server Error');
    }
}   
