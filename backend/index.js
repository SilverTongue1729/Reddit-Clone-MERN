import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  res.send('This is a post request');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});

//m

/*
mongodb+srv://admin:<password>@cluster0.ludgzni.mongodb.net/?retryWrites=true&w=majority
*/
