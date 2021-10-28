const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('pages/add-keys');
});


// adding properties and keys
router.post('/', (req,res) => {
  const { unit_number, building_number, street_name, key_number } = req.body;

  // Back-end validation for the form
  const errors = [];

  if (!unit_number || !building_number || !street_name || !key_number) errors.push({ message: "Please fill all fields." });

  if (errors.length > 0) {
    res.render('pages/add-keys', { errors });
  } else {
    // If it gets here - means the form validation has passed
    db.oneOrNone("SELECT * FROM properties WHERE key_number = $1;", key_number)
    .then(keyExists => {

      if (keyExists) {
        errors.push({ message: "Key number is already assigned" });
        res.render('pages/add-keys', { errors });
      } else {

        // if the key number is available
        db.none(`INSERT INTO properties (unit_number, building_number, street_name, key_number) VALUES ($1, $2, $3, $4);`, [unit_number, building_number, street_name, key_number])
        .then(() => {
          res.redirect('/')
        })
        .catch(error => {
          console.log(error)
        })
      }

    })
    .catch(error => {
      console.log(error)
    })

  }

});

module.exports = router;