$('#search-address').on('input', (e) => {
  e.preventDefault();

  // value from inputs
  const searchValue = $('#search-address').val();

  // if there is input, we will send an API request to the database
  if (searchValue) {

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

        // searching for the property with matching numbers
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

})
