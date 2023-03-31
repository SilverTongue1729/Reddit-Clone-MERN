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

  savedPosts: [{ postId: { type: Schema.Types.ObjectId, ref: 'Post' } }],
  followers: [{
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true }
  }],
  following: [{
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true }
  }],
  subgreddiits: [{
    status: { type: String, enum: ['joined', 'blocked', 'banned', 'requested', 'moderator'], default: 'requested' },
    subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit' },
  }],
}, {
  methods: {
    checkPassword (password) {
      return bcrypt.compare(password, this.password);
    },
    genToken () {
      // return jwt.sign({ user: { id: this._id } }, process.env.JWT_SECRET, {
      return jwt.sign({ user: { id: this._id } }, "admin", {
        // expiresIn: process.env.JWT_EXPIRE,
        expiresIn: "30d",
      });
    }
  }
});

const User = mongoose.model("User", userSchema);

export default User;
