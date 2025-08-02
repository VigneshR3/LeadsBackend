const User = require("../Model/UserModel");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;
 const  UserLogin =  async(req, res) => {
    try {
      console.log("logissssssssssssssssssssssssssssssssssssssn", req.body);
      const GetUser = await User.findOne({ email: req.body.email });
      console.log("GetUsersdfffffffffffffffffff", GetUser);

    //   const Email = req.body.email;
      
      const password = req.body.password;
      // const match = await bcrypt.compare(password, GetUser.password);
    //   console.log(GetUser, "matchhhhhh0");
      if (password === GetUser.password) {
        const token = jwt.sign(
          {
            id: GetUser._id,
            username: GetUser.username,
            role: GetUser.role,
            // isPremium: GetUser.isPremium,
          },
          process.env.SECRET_KEY
        );
        console.log(token, "tokentokentoken");
        res.header("Authorization", token);
        res.status(200).json({ token, message: "Login Successfully " });
      } else {
        res.status(401).json({ message: "Username/password are incorrect" });
      }
    } catch (error) {
        console.log(error);
        
      res.status(401).json({ message: "Faild! to Login " });
    }
  }
   
  const IsCheckUser = (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
     console.log(req)
      // invalid token
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        console.log("decodeadmin", decoded);
        if (err)
          return res.status(401).json({ message: "You are not authorized" });

        if (decoded.role === "USER") {
          return res.status(200).json({ success: true, role: "USER" });
        }
         
      });
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  module.exports = {IsCheckUser , UserLogin}
   
