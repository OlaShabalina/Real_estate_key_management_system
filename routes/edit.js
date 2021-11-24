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

  // making sure user can't change address to the existing one (for this or other property)
  db.oneOrNone('SELECT key_number FROM properties WHERE unit_number = $1 AND building_number = $2;', [ unit_number, building_number ])
  .then(keyExists => {
    
    if (keyExists) {

      // stopping users from duplicating property address while editing exisiting one
      req.flash("error_msg", "This address is already in use.");
      res.redirect(`/edit/${id}`);
    } else {

      // if the address is new/unique we change it in the system
      db.any('UPDATE properties SET unit_number = $1, building_number = $2, street_name = $3 WHERE key_number = $4;', [ unit_number, building_number, street_name, id ])
      .then(() => { 
      req.flash("success_msg", "The address has been updated.");
      res.redirect(`/edit/${id}`);
      })
      .catch(error => {
        console.log(error)
      });

    }

  })
  .catch(error => {
    console.log(error)
  });    

});

// post request for deleting the property data
router.post('/delete/:id', (req, res) => {
  const { id } = req.params; 

  db.none('DELETE FROM properties WHERE key_number = $1;', id)
  .then(() => {
    req.flash("success_msg", `Property with key code SBP-${id} has been deleted.`);
    res.redirect('/')
  })
  .catch(error => {
    console.log(error)
  });
})

module.exports = router;