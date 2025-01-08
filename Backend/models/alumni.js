const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const alumniSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        
    },
    batch:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    linkedin:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
})
alumniSchema.methods.generateAuthToken=function(){
    try{
        const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
        return token;
    }catch(error){
        throw new Error('Error generating token');
    }
}

const alumniModel=mongoose.model('Alumni',alumniSchema);
module.exports=alumniModel;