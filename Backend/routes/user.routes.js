const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controllers/user.controller');
const {authUser}=require('../middlewares/auth');

router.post('/register',[
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
    body('branch').not().isEmpty().withMessage('Branch is required'),
    body('batch').not().isEmpty().withMessage('Batch is required'),
    body('contact').not().isEmpty().withMessage('Contact is required')

],userController.registerUser)

router.post('/login',[body('email').isEmail().withMessage('Please enter a valid email'),
body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],userController.loginUser)

router.get('/profile',authUser,userController.getUserProfile)

router.post('/logout',authUser,userController.logoutUser)

module.exports=router;