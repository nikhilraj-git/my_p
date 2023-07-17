const User=require('../models/User')
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");
class AuthController{
    userRegister=async(req,res)=>{
        console.log("11111111111111",req.body);
        const encryptPassword=CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
          ).toString()
        // const password=encryptPassword.toString();
        // console.log("3333333333333",encryptPassword);
        const newUser = new User({
       username: req.body.username,
       email: req.body.email,
       password:encryptPassword,
       //password:req.body.password
     });
     console.log("222222222222222",newUser);
     try {
       const user = await newUser.save();
       res.status(201).json(user);
     } catch (err) {
        console.log("333333333333",err);
       res.status(500).json(err);
     }
   
   
   }
   userLogin=async(req,res)=>{
    
       try {
           const user = await User.findOne({ email: req.body.email });
    
           //const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
           //const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
           const originalPassword=user.password
           console.log("4444444444",originalPassword.length);


           const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
          );
           console.log("555555555555",accessToken);
          const { password, ...info } = user._doc;
          console.log("6666666666666666",user._doc);

           console.log("22222222222222",user);
           if(!user){
              console.log("****************************");
              res.status(401).json("Wrong password or username!");
           }
           
           
       
           else if(originalPassword !== req.body.password)
           {
             console.log("originalPasswordoriginalPassword------------",originalPassword);
             console.log("req.body.passwordreq.body.password",req.body.password);
             console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
             res.status(401).json("Wrong password or username!");
           }
       
           else
              res.status(200).json({ ...info, accessToken });
         } 
         catch (err) {
           console.log("SSSSSSSSSSSS",err);
           res.status(500).json(err);
         }
   
   }
   }
   
   module.exports=new AuthController