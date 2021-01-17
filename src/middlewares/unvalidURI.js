const express = require('express');
const router = express.Router();

  router.all('*', (req, res) => {
    console.log('Unvalid route'.red.bold, req.url.bold.red);
    res.status(400).json({ error: `Unvalid route ${req.url}` });
  })

module.exports = router;
