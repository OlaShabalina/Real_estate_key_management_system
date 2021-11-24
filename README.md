# Real estate key management system

As a real estate agent, I always struggled with keys. As we can't have the real property address on the label - it's always a challenge to memorise which code is for which property.

So I created this app for our day-to-day operations. 

## Usage

Type a property address to find the matching key number. You can also add new property/keys.

## Getting Started

### Dependencies

* Express
* Ejs
* pg-promise

### Installing

* Clone from https://github.com/OlaShabalina/Real_estate_key_management_system
* Copy and fill .env file

### Executing program

* Install dependencies
* Run dev start code

```
npm run dev
```

## Deployed app 

Deployed version is avaialble here => http://localhost:1112/add-keys

## Overview

##### Home page with the key search

![Capture333](https://user-images.githubusercontent.com/88268603/139426334-13eeabd0-811e-480e-9dad-a16b803c8f35.PNG)

##### Home page with the key search result

![Capture44](https://user-images.githubusercontent.com/88268603/139426330-0e2960d3-9f3d-4143-900b-e231e131e82e.PNG)

##### Page to add a new property and assign a key

![Captu33re](https://user-images.githubusercontent.com/88268603/139426338-caf3687f-d695-4c20-99ff-81ad9e42536a.PNG)

### After using the app for 1 month and getting real life feedback from the users, new functions have been added:

* Update property details for the property which already has a key code assigned (for cases when users made a typo while adding a new property to the system)
* Delete the property once it's sold so the key code can be asigned again to another property

##### Page to update the property or delete it from the system 
![Captur3132e](https://user-images.githubusercontent.com/88268603/143219179-d9573b85-b335-425e-97a0-0e2038b20acc.PNG)


