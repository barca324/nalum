const alumnimodel = require('../models/alumni.js');

module.exports.createAlumni = async (name, email, password, batch, branch,company,designation,linkedin,contact) => {
    try {
        if(!name || !email || !password || !batch || !branch ||!company|| !designation || !linkedin || !contact) {
            throw new Error('All fields are required');
        }
        console.log('Service received data:', { name, email, password, batch, branch, company,designation,linkedin,contact});  // Log received data

        // Hash password
        

        // Create new user
        const alumni = new alumnimodel({ name, email, password, batch, branch, company,designation,linkedin ,contact});

        // Save the user to the database
        await alumni.save();

        // Return the saved user
        return alumni;
    } catch (error) {
        console.error('Error in service:', error);
        throw error;  // Rethrow error to handle it in the controller
    }
}