const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },
  task_desc: {
    type: String,
    required: true,
  },

created_at: {
    type:String,
    default:  Date,
    
    
  },

 
 
  

});


const task = mongoose.model("task", userSchema);

module.exports = task;
