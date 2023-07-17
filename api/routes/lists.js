const express=require('express')
const router=express.Router();
const List=require("../models/List")
const verify=require('../verifyToken')

//CREATE

// const ListController=require('../controllers/listController')

// router.post('/',ListController.createList)
// router.delete('/:id',ListController.deleteList)
// router.get('/',ListController.getList)

router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      const newList = new List(req.body);
      try {
        const savedList = await newList.save();
        res.status(201).json(savedList);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
  
  //DELETE
  
  router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await List.findByIdAndDelete(req.params.id);
        res.status(201).json("The list has been delete...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
  
  //GET
  
  router.get("/", verify, async (req, res) => {
    const typeQuery = req.body.type;
    const genreQuery = req.query.genre;
    console.log("TypeQuery=",typeQuery);
    console.log("GenreQuery=",genreQuery);
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  


//Create
//Delete
//Get
