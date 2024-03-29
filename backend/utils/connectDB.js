import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default function connectDB () {
  // mongoose.connect(process.env.MONGO_URI, {
  mongoose.connect("mongodb+srv://admin:admin@cluster0.ludgzni.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    })
    .catch((err) => {
      console.error(`Error in connecting to MongoDB: ${err.message}`);
      process.exit(1);
    });
}