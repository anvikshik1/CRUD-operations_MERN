const express = require('express');
const User = require('../modals/userModal');

const router = express.Router()

// -------------------------Post--------------------------------------
router.post("/",async(req,res)=>{
    try {
        const {name,email,age} = req.body;
        const userAdded =await User.create({
            name:name,
            email:email,
            age:age
        })
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
});
// -------------------------get--------------------------------------
router.get("/",async (req,res)=>{
    try {
        const allUsers =await User.find()
        res.status(200).json(allUsers);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
});

// -------------------------get single user--------------------------------------

router.get("/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const singleUser =await User.findById({_id:id})
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
});

// -------------------------delete single user--------------------------------------

router.delete("/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteUser =await User.findByIdAndDelete({_id:id})
        res.status(200).json(deleteUser);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
});

// -------------------------update single user--------------------------------------

router.patch("/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const updateUser =await User.findByIdAndUpdate({_id:id},req.body,{
            new:true,
            runValidators: true,
        })
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
});

module.exports = router;