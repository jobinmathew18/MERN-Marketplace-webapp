const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( ()=>{
    console.log("MongoDB connection successful");
}).catch( (error) =>{
    console.log(error);
});
  