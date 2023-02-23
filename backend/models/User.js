import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, unique: true, trim: true, required: true },
  age: { type: Number, required: true },
  contactNo: { type: String, required: true },
  password: { type: String, required: true },

  savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  subgreddiits: [{
    status: { type: String, enum: ['joined', 'blocked', 'requested'], default: 'requested' },
    subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit' },
    date: { type: Date }
  }],
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.genToken = function () {
  return jwt.sign({ user: { id: this._id } }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


const User = mongoose.model("User", userSchema);

export default User;
