import express from 'express';

import connectDB from './utils/connectDB.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import followingRoutes from './routes/following.js';
import followerRoutes from './routes/follower.js';

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/following', followingRoutes);
app.use('/api/follower', followerRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
