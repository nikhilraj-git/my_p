const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const authRoute=require('../api/routes/auth')
const userRoute=require('../api/routes/users')
const movieRoute=require('../api/routes/movies')
const listRoute=require('../api/routes/lists')


dotenv.config();
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB connection successfull!!");
}).catch((err)=>
{
    console.log(err);
}
)
app.use(bodyParser.json())
app.use("/auth", authRoute)
app.use("/users", userRoute);
app.use("/movies", movieRoute);
app.use("/lists", listRoute);


app.listen(process.env.PORT,()=>{
    console.log('Backend Server is Running');
})