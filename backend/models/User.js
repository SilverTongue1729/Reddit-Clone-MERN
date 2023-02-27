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
  followers: [{
    userid: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: { type: String, required: true}
  }],
  following: [{
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true }
  }],
  subgreddiits: [{
    status: { type: String, enum: ['joined', 'blocked', 'requested','moderator'], default: 'requested' },
    subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit' },
    date: { type: Date }
  }],
}, {
  methods: {
    checkPassword (password) {
      return bcrypt.compare(password, this.password);
    },
    genToken () {
      return jwt.sign({ user: { id: this._id } }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    }
  }
});


// userSchema.methods.checkPassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

// userSchema.methods.genToken = function () {
//   return jwt.sign({ user: { id: this._id } }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

const User = mongoose.model("User", userSchema);

export default User;
