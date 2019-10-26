// call all the required packages
const express = require('express');
const multer = require('multer');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Yayy');
  next();
});

// ROUTES WILL GO HERE
router.get('/api', (req, res) => {
  res.json({ message: 'It works' });
});

module.exports = router;
