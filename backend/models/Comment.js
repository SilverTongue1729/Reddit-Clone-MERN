import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  text: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;