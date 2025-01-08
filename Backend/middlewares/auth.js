const userModel = require('../models/user.model');
const alumniModel=require('../models/alumni.js')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        req.user=user;
        return next();

    }
    catch(error){
        console.error('Error in authentication:',error);
        return res.status(401).send('Unauthorized');
    }
}

module.exports.authAlumni=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const alumni=await alumniModel.findById(decoded._id);
        req.alumni=alumni;
        return next();

    }
    catch(error){
        console.error('Error in authentication:',error);
        return res.status(401).send('Unauthorized');
    }
}