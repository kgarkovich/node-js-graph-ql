const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.send('Hello from the backend!');
});

module.exports = router;