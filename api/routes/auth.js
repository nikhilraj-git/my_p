const express=require('express');
const router=express.Router();

const AuthController=require('../controllers/authController')
//Register
router.post('/register',AuthController.userRegister)
//Login
router.post('/login',AuthController.userLogin)



module.exports=router;