const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/FlyDreamAir', {
    useNewUrlParser : true,
    useCreateIndex:true
},(err) => {
    if(!err)
        {
            console.log("Database connected successfully!")
        }
})