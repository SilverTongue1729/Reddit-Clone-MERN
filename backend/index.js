import express from 'express';

import connectDB from './utils/connectDB.js';

import userRoutes from './routes/user.js';

const app = express();
app.use(express.json());

connectDB();

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
