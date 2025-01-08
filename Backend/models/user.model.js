const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const argon=require('argon2')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
    branch:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
});

// Generate auth token
userSchema.methods.generateAuthToken = function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
};

// Compare provided password with stored password
userSchema.methods.comparePassword = async function (password) {
    try {
        console.log("Provided password:", password); // Logs the plain-text password input
        console.log("Stored hashed password:", this.password); // Logs the stored hashed password
        
        // Compare the plain-text password directly with the stored hash using argon2 verify
        const isMatch = await argon.verify(this.password, password);

        console.log("Password match:", isMatch); // Logs if the comparison returns true or false

        return isMatch;
    } catch (error) {
        console.error("Error during password comparison:", error);
        throw new Error('Error comparing password');
    }
};



// Hash password
userSchema.statics.hashPassword = async function (password) {
    try {
       
        const hashedPassword = await argon.hash(password);
        console.log('Hashed Password at Registration:', hashedPassword);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
};


const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
