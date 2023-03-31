import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit', required: true },
  votes: [{
    type: Schema.Types.ObjectId, ref: 'User',
    enum: ['upvote', 'downvote']
  }],
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['visible', 'reported_sometime'], required: true, default: 'visible' },
  comments: [{ commentId: { type: Schema.Types.ObjectId, ref: 'Comment' } }],
  savedBy: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' } }],
});

const Post = mongoose.model('Post', PostSchema);

export default Post;  