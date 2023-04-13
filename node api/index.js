const express = require('express')
const app = express();
require('./dbConn')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const userRoute = require('./routes/users') 
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require("./routes/stripe");
const cookieParser = require ('cookie-parser')

app.use(cookieParser())
app.use(express.json())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`app running on port ${process.env.PORT}`)  
})      