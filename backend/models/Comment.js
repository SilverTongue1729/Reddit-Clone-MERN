import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit', required: true },
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;