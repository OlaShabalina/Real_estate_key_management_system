const express = require('express');
const router = express.Router();
const db = require('../database');

// This route is for passing the data from db to front-end

router.get('/', (req,res) => {

    // getting all the ratings from the db
    db.any(`SELECT * FROM properties;`)
    .then((propertyInfo) => {
        
        res.json({ propertyInfo });
    })
    .catch((error) => {
        
        res.status(400).json({"error_message":"this page is not available"});
    });

});

module.exports = router;