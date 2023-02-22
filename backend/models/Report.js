import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  reporterId: { type: Schema.Types.ObjectId, ref: 'User' },
  reporteeId: { type: Schema.Types.ObjectId, ref: 'User' },
  concern: { type: String },
  subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit' },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  date: { type: Date },
  status: { type: String, enum: ['Neutral', 'Ignored', 'Blocked'] }
});

const Report = mongoose.model('Report', ReportSchema);

export default Report;