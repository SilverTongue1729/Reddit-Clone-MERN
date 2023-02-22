  import express from 'express';
  import bcrypt from 'bcryptjs';
  
  const router = express.Router(); 
  
  router.get('/', (req, res) => {
    res.send('This is a user get request');
  });
  
  export default router;