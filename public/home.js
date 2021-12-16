$('#search-address').on('input', (e) => {
  e.preventDefault();

  // value from inputs
  const searchValue = $('#search-address').val();

  if (searchValue) {

    // if the search criteria includes sbp (key code), we will be searching for keycode and not address
    if (searchValue.toLowerCase().includes('sbp')) {

      // in order to disregard spaces, and the way user types sbp, we will only search for last 4 digits in the db
      const keyCode = Number(searchValue.substr(-4, 4));

      // sending request to our backend database
      $.ajax('/api_key_number').then(data => {

        const propertiesArray = data.propertyInfo;

        // searching for the property with matching key code
        const propertyIsFound = propertiesArray.find(property => {
          return (property.key_number === keyCode );
        })

        if (propertyIsFound) {

          // if there is a property in db for this key code, we show it
          let property = $(`<h3 class="with-underline">${propertyIsFound.unit_number}/${propertyIsFound.building_number} ${propertyIsFound.street_name}</h3> <a class="edit-link" href="/edit/${propertyIsFound.key_number}"> (edit) </a>`)

          $(".key-number").html(property);

        } else {

          $(".key-number").html(`No property found.`);
        }

      })
      
    } else {
      // if search criteria doesn't include sbp - means user is looking for a property address

      // separating values for unit number, building number and street name
      const searchParams = searchValue.split('/');
      const unitNumber = searchParams[0].trim();
      const buildingNumber = searchParams[1] && searchParams[1].split(' ')[0].trim();
      const streetName = searchParams[1] && searchParams[1].slice(4).trim();

      // searching for a match after users adds at least unitNumber and buildingNumber
      if (searchParams.length >= 2) {

        // sending request to our backend database
        $.ajax('/api_key_number').then(data => {

          const propertiesArray = data.propertyInfo;

          // searching for the property with matching address
          const propertyIsFound = propertiesArray.find(property => {
            return (property.unit_number === unitNumber && property.building_number === buildingNumber);
          })

          // if the address exists in our db - we show key number
          if (propertyIsFound) {

            // if there is a key number in db, we show it
            let keyNumber = $(`<h3 class="with-underline"> SBP - ${propertyIsFound.key_number} </h3> <a class="edit-link" href="/edit/${propertyIsFound.key_number}"> (edit) </a>`)
            $(".key-number").html(keyNumber);
          } else {

            $(".key-number").html(`This property doesn't have a key assigned or address is incorrect`);
          }

        })

      } else {
        
        // remove note if user clears the search field
        $(".key-number").html('');

      }
      
    }

  }    

})
