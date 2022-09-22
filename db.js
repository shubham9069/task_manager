const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task_manager',{ 
    // useNewUrlParser: true,
    //  useCreateIndex: true,
    //  useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=>{
    console.log('Connect successful');

}).catch((err) =>{
    console.error('not successful');
})
