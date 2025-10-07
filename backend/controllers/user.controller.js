import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function getUser(req,res,next){
  try{
    if(!req.cookies.token){
      return res.status(401).json({success:false,message:"No Authentication Token found"});
    }
    let user=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
    user= await userModel.findById(user.id);
    if(!user){
      return res.status(404).json({success:false,message:"User not found"});
    }
    res.status(200).json({success:true,user});
  }catch(err){
    next(err);
  }
}
async function register(req, res,next) {
  // Registration logic here
  try{
  let { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  if(await userModel.findOne({email}) || await userModel.findOne({username})){
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  const newUser = new userModel({ username, email, password });
  await newUser.save();
  let token = newUser.generateJWT();
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000*60*60*24*7,
  });
  res
    .status(201)
    .json({
      success: true,
      message: "User registered successfully"
    });
  }catch(err){
    next(err);
  }
}

async function login(req, res,next) {
  try{
    console.log(req.body);
  let { email, password } = req.body;
  let user= await userModel.findOne({email});
  if(!user){
    return res.status(400).json({success:false,message:"Invalid email or password"});
  }
  let isMatch= await user.comparePassword(password);
  if(!isMatch){
    return res.status(400).json({success:false,message:"Invalid password"});
  }
  let token = user.generateJWT();
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60*24*7, // 1 hour
  });
  res.status(200).json({success:true,message:"Login successful"});
}catch(err){
  next(err);
}
}
function logout(req, res) {
  
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
}

const controller = { register, login, logout,getUser };
export default controller;
