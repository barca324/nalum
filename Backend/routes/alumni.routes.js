const express=require('express')
const router=express.Router();
const {body}=require('express-validator')
const alumniController=require('../controllers/alumni.controller')
const {authAlumni}=require('../middlewares/auth')

router.post('/register',[
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
    body('batch').not().isEmpty().withMessage('Batch is required'),
    body('branch').not().isEmpty().withMessage('Department is required'),
    body('company').not().isEmpty().withMessage('Company is required'),
    body('designation').not().isEmpty().withMessage('Designation is required'),
    body('linkedin').not().isEmpty().withMessage('Linkedin is required'),
    body('contact').not().isEmpty().withMessage('Contact is required')


],alumniController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],alumniController.loginUser)

router.get('/profile',authAlumni,alumniController.getUserProfile)

router.get('/logout',authAlumni,alumniController.logoutUser);


module.exports=router;