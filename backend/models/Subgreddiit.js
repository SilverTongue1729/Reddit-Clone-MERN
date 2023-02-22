import mongoose from "mongoose";

const SubgreddiitSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  moderatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: { type: Date },
  tags: [{ type: String }],
  bannedWords: [{ type: String }],
  users: [{
    status: { type: String, enum: ['joined', 'blocked', 'requested'] },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date }
  }],
  posts: [{
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    date: { type: Date },
    status: { type: String, enum: ['visible', 'deleted', 'reported_sometime'] }
  }],
  reports: [{
    reportId: { type: Schema.Types.ObjectId, ref: 'Report' },
  }]
});

const Subgreddiit = mongoose.model('Subgreddiit', SubgreddiitSchema);

export default Subgreddiit;