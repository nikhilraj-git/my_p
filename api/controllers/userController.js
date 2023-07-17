const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

class UserController{
    updateUser=async(req,res)=>{
        console.log("111111111",req.body);
        console.log("2222222222",req.user);
        if (req.body._id === req.params.id || req.user.isAdmin) {
          console.log("Condition is satisfied");
          if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
              req.body.password,
              process.env.SECRET_KEY
            ).toString();
          }
      
          try {
            const updatedUser = await User.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updatedUser);
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(403).json("You can update only your account!");
        }
    }
    deleteUser=async(req,res)=>{
      console.log("Request params for delete user",req.params);
      console.log("Request body for ",req.body);
        if (true ) {
            try {
              await User.findByIdAndDelete(req.params.id);
              res.status(200).json("User has been deleted...");
            } catch (err) {
              console.log("ERRRRRRR",err);
              res.status(500).json(err);
            }
          } else {
            res.status(403).json("You can delete only your account!");
          }
    }
    getUserById=async(req,res)=>{
        try {
            const user = await User.findById(req.params.id);
            const { password, ...info } = user._doc;
            res.status(200).json(info);
          } catch (err) {
            res.status(500).json(err);
          }
    }
    getAllUsers=async(req,res)=>{
        const query = req.query.new;
        console.log("NEW-----------",query);
        console.log("isAdmin---------",req.body.isAdmin);
       
        if (true) {
          try {
            const users = query
              ? await User.find().sort({ _id: -1 }).limit(10)
              : await User.find();
            res.status(200).json(users);
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(403).json("You are not allowed to see all users!");
        }
    }
    getUserStats=async(req,res)=>{
        const today = new Date();
        const latYear = today.setFullYear(today.setFullYear() - 1);
      
        try {
          const data = await User.aggregate([
            {
              $project: {
                month: { $month: "$createdAt" },
              },
            },
            {
              $group: {
                _id: "$month",
                total: { $sum: 1 },
              },
            },
          ]);
          res.status(200).json(data)
        } catch (err) {
          res.status(500).json(err);
        }
    }

}

module.exports=new UserController