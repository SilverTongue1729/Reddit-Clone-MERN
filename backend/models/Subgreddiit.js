import mongoose from "mongoose";

const { Schema } = mongoose;

const SubgreddiitSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  // image: { type: String },
  moderatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dateCreated: { type: Date, default: Date.now },
  tags: [{ type: String }],
  bannedWords: [{ type: String }],

  users: [{
    status: { type: String, enum: ['joined', 'blocked', 'requested', 'moderator'], default: 'requested' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now }
  }],
  posts: [{
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  }],
  reports: [{
    reportId: { type: Schema.Types.ObjectId, ref: 'Report' },
  }]
});

const Subgreddiit = mongoose.model('Subgreddiit', SubgreddiitSchema);

export default Subgreddiit;