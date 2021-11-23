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
  .catch(error => {
    console.log(error)
  });  

});


// adding properties and keys
router.post('/:id', (req,res) => {
  const { id } = req.params; 
  const { unit_number, building_number, street_name } = req.body;
  console.log(id)
  console.log(req.body)

  db.any('UPDATE properties SET unit_number = $1, building_number = $2, street_name = $3 WHERE key_number = $4;', [ unit_number, building_number, street_name, id ])
  .then(() => {
    
    res.redirect(`/edit/${id}`);
  })
  .catch(error => {
    console.log(error)
  });  

});

module.exports = router;