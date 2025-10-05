import {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },
    updatedAt: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        // Hash the password before saving (pseudo-code, replace with actual hashing logic)
        this.password = await bcrypt.hash(this.password,10);
    }
  this.updatedAt = Date.now();
  next();
});
UserSchema.methods={
    comparePassword: async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    },
    generateJWT: function() {
        return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    }
}

export default mongoose.model('user',UserSchema);