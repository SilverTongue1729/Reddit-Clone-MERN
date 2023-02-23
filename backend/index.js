import express from 'express';

import connectDB from './utils/connectDB.js';

import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());

connectDB();

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  res.status(200).send({name: 'John Doe'});
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
