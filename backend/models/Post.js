import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit' },
  upvotes: { type: Number },
  downvotes: { type: Number },
  date: { type: Date },
  status: { type: String, enum: ['visible', 'deleted', 'reported_sometime'] },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  savedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.model('Post', PostSchema);

export default Post;