const mongoose = require('mongoose')
const express = require("express");
const Router = express.Router();
require("./db");
const task = require("./userSchema");


Router.post('/taskuploade',async(req, res)=>{
    const {taskn,taskd}=req.body;

    try{
        const tasksave= new task({task_name:taskn,task_desc:taskd})
        await tasksave.save()
        res.status(200).send({message:"task created succseffuly  " })
        
    }
    catch(err){
        res.status(404).send({message:"task not created ", err})
    }

   
})
Router.get('/taskget',async(req, res)=>{
    try{
        const taskget= await task.find()
      
        res.status(200).send({message:"task get  succseffuly  ",data:taskget })

    }
    catch(err)
    {

        res.status(404).send({message:"message not show ", err})
    }
})


module.exports=Router;