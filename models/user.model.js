import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
const userSchema=new Schema({
    username:{
        type:'String',
        required:[true,'username is required'],
        minLength:[5,'username must be at least 5 character'],
        maxLength:[50,"username should be less than 50 character"],
        lowercase:true,
        trim:true, //first and last side space trim karke rakhega
    },
    email:{
        type:'String',
        required:[true,'Email is required'],
        lowercase:true,
        trim:true,
        unique:true,
    },
    password:{
        type:'String',
        required:[true,'Password is required'],
        minLength:[8,'Password must be atleast 8 character'],
        select:false
    },
     role:{
        type:'String',
        enum:['USER','ADMIN'],
        default:'USER'
    },
},{
    timestamps:true
})
const User=model('User',userSchema);
export default User;