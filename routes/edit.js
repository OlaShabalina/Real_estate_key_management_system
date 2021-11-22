const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/:id', (req,res) => {
  const { id } = req.params;

  db.oneOrNone("SELECT * FROM properties WHERE key_number = $1;", id)
  .then(keyExists => {
    
    // if key exists we want to display property details for that property
    if (keyExists) {
      
      const { unit_number, building_number, street_name, key_number } = keyExists;

      res.render('pages/edit', { unit_number, building_number, street_name, key_number });
    }
  })
  

});


// adding properties and keys
router.post('/', (req,res) => {

});

module.exports = router;