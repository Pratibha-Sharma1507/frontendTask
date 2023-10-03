const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const jwt = require("jsonwebtoken");
app.use(cors(
    {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}
));

const userRouter = require('./Route/UserRoute/userRoute');
app.use('/', userRouter);

const taskRouter = require('./Route/TaskRoute/taskRoute');
app.use('/', taskRouter);

const verifyUser = (req, res, next) =>{
    const token = req.cookies.token;
    console.log(token);

    if(!token){
        return res.json({Error: "you are not authentication"});
    }else{
        jwt.verify(token, "jwt-secret-key",(err,decoded) => {
            if(err){
                return res.json({Error: "Token is not okey"});
            }else{
              req.user_name = decoded.user_name;
                next();
            }
        })
    }
  }
  

app.get('/', verifyUser ,(req, res)=>{
    return res.json({Status: "Success", user_name: req.user_name});
  
  })

  app.get('/logout',(req,res) => {
    res.clearCookie('token');
    
    return res.json({Status: 'Success'});
  })

const port=7700;
app.listen(port,()=>{
    console.log(`server is running on ${port} port`)
});
