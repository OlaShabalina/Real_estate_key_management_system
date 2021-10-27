const express = require('express');
const router = express.Router();
const db = require('../database');

// This route is for passing the data from db to front-end

router.get('/', (req,res) => {

    // getting all the ratings from the db
    db.oneOrNone(`SELECT key_number FROM properties WHERE unit_number='73' AND building_number='416A';`)
    .then((keyNumber) => {
        
        console.log(keyNumber);
        res.json({ keyNumber });
    })
    .catch((error) => {
        
        res.status(400).json({"error_message":"this page is not available"});
    });

});

module.exports = router;