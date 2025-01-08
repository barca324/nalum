const alumnimodel=require('../models/alumni.js');
const { validationResult } = require('express-validator');
const bcrypt=require('bcrypt')
const alumniService=require('../services/alumni.service');
const alumniModel = require('../models/alumni.js');


module.exports.registerUser=async (req,res,next)=>{
    try{
        console.log('Request Body:',req.body);
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {name,email,password,batch,branch,company,designation,linkedin,contact}=req.body;
        const find=await alumniModel.findOne({email});
        if(find){
            return res.status(400).send('User already exists');
        }
        const hashedPassword=await bcrypt.hash(password,10);
        console.log('Hashed Password:',hashedPassword);
        const alumni=await alumniService.createAlumni(name,email,hashedPassword,batch,branch,company,designation,linkedin,contact);
        console.log("re",alumni)
        const token=alumni.generateAuthToken();
        console.log('Alumni created:',alumni);
        if(!alumni){
            return res.status(400).send('Alumni could not be created');
        }
        res.cookie('token',token);
        res.status(201).send({alumni,token});
    }catch(error){
        console.error('Error registering alumni:',error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports.loginUser=async (req,res,next)=>{
    try{
        console.log('Request Body:',req.body);
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {email,password}=req.body;
        const alumni=await alumniModel.findOne({email});
        if(!alumni){
            return res.status(400).send('User not found');
        }
        const isMatch=await bcrypt.compare(password,alumni.password);
        if(!isMatch){
            return res.status(400).send('Invalid credentials');
        }
        const token=alumni.generateAuthToken();
        console.log('Alumni logged in:',alumni);
        res.status(200).send({alumni,token});
    }catch(error){
        console.error('Error logging in alumni:',error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.getUserProfile=async(req,res,next)=>{
    try{
        const alumni=req.alumni;
        res.status(200).send(alumni);
    }catch(error){
        console.error('Error getting user profile:',error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.logoutUser=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        res.clearCookie('token');
        res.status(200).send('Logged out successfully');
    }catch(error){
        console.error('Error logging out:',error);
        res.status(500).send('Internal Server Error');
    }
}

