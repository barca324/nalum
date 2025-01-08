const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
dotenv.config();
const alumniroutes=require('./routes/alumni.routes');


app.use(cors());
const connectToDb=require('./db/db');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const userRoutes=require('./routes/user.routes');
connectToDb();
app.get('/',(req,res)=>{
    res.send("<h1>Hello world</h1>");
});

app.use('/users',userRoutes);
app.use('/alumni',alumniroutes);

module.exports=app;
