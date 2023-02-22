import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  userName: { type: String, unique: true, trim: true },
  age: { type: Number },
  contactNo: { type: String },
  password: { type: String },
  savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  subgreddiits: [{
    status: { type: String, enum: ['joined', 'blocked', 'requested'] },
    subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit' },
    date: { type: Date }
  }],

  
  method: {
    checkPassword (password) {
      return bcrypt.compare(password, this.password);
    },
    genToken () {
      return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    }
  }
});

const User = mongoose.model("User", userSchema);

export default User;
