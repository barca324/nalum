const userModel = require('../models/user.model');

module.exports.createUser = async (name, email, password,branch,batch,contact) => {
    try {
        console.log('Service received data:', { name, email, password });  // Log received data

        // Hash password
        

        // Create new user
        const user = new userModel({ name, email, password,branch,batch,contact});

        // Save the user to the database
        await user.save();
        
        // Return the saved user
        return user;
    } catch (error) {
        console.error('Error in service:', error);
        throw error;  // Rethrow error to handle it in the controller
    }
};
