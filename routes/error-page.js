const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req,res) => {
  res.render('./pages/error-page');
});

module.exports = router;