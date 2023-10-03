const connection = require("../../Model/dbConnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const salt = 10;

const signup = async (req, res) => {
    try {
      const { user_id, user_name, password } = req.body;
      console.log(req.body);
      const query = "select * from users where user_id = ?";
      const query1 = "Insert into users set ?";
      const salt = await bcrypt.genSalt(10);
      console.log("salt", salt);
      const pass = await bcrypt.hash(password, salt);
      console.log("password", password);
      const data1 = {
        user_id,
        user_name,
        password: pass
        
      };
      connection.query(query, user_id, (error, result) => {
        if (result.length) {
          return res.send({ message: "user_id already Exist" });
        }
        connection.query(query1, data1, (err, result) => {
          if (err) {
            return res.send({ Error: err.sqlMessage });
          }
          return res.send({ Status: 200, Response: result });
        });
      });
    } catch (err) {
      res.send(err.sqlMessage);
    }
  };

  const login = async (req, res) => {
    const sql ="SELECT * FROM users WHERE user_id = ?";
    connection.query(sql,[req.body.user_id], (err,data) => {
        if(err)  return res.json({Error: "Login error in server"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err,response)=>{
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    const user_name = data[0].user_name;
                    const user_id = data[0].user_id;
                    const token = jwt.sign({user_name}, "jwt-secret-key",{expiresIn: '1d'});
                    res.cookie('token',token);
                    res.cookie("id",user_id);
                    return res.json({Status : "Success"});
                }else{
                    return res.json({Error: "Password not matched"})
                }
     })
        }else{
            return res.json({Error: "No user_id existed"});
        }
    })
}
module.exports = { signup, login };