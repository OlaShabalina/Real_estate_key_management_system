const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('./pages/add-keys');
});


// adding properties and keys
router.post('/', (req,res) => {
  const { unit_number, building_number, street_name, key_number } = req.body;

  db.none(`INSERT INTO properties (unit_number, building_number, street_name, key_number) VALUES ($1, $2, $3, $4);`, [unit_number, building_number, street_name, key_number])
  .then(() => {
    res.redirect('/')
  })
  .catch(error => {
    console.log(error)
  })

  res.redirect('/');
});

module.exports = router;