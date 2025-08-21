import AppError from "../utils/error.util.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import crypto from "crypto";
const cookieOptions={
    maxAge:7*24*60*60*1000, // 7 days
    httpOnly:true,
    secure:true
};
export const register=async(req,res,next)=>{

}
export const login=async(req,res,next)=>{

}
export const logout=async(req,res,next)=>{
    
}