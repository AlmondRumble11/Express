const express = require("express");
const router = express.Router();
//get users form Users.js
const users = require('../../Users');
//get uuid package
const uuid = require("uuid");




//show all users using http://localhost:5000/api/users
router.get('/', (request, response) => {
    response.json(users); //no need to do stringyfy --> .json handles it
});

//getting one of the users. Using id
router.get('/:id', (request, response) => {
    //response.send(request.params.id) gets 4 from http://localhost:5000/api/users/4
    const found = users.some(users => users.id === parseInt(request.params.id));

    //checks if there is an users by that given id
    if (found) {
        response.json(users.filter(users => users.id === parseInt(request.params.id)));
    } else {
        //give no user found by given id
        response.status(400).json({ message: `No user found by id of ${request.params.id}` });
    }
});

//creating a new user
router.post("/", (request, response) => {
    // response.send(request.body); sends body back
    const newUser = {
        id: uuid.v4(),
        name: request.body.name,
        status: "active",
        address: request.body.address
    }

    if (!newUser.name || !newUser.address) {
        return response.status(400).json({ message: "Add both address and a name." });
    }

    //add to users array
    users.push(newUser);

    //return back the array with new member
    response.json(users);

    //redirect to main page
    // response.redirect("/");
});

//updating users data. update needs put request
router.put('/:id', (request, response) => {
    //response.send(request.params.id) gets 4 from http://localhost:5000/api/users/4


    const found = users.some(users => users.id === parseInt(request.params.id));
    //checks if there is an users by that given id
    if (found) {
        const updateUser = request.body;

        //go throught the current users and update the user with the right id
        users.forEach(users => {
            if (users.id === parseInt(request.params.id)) {

                //checks if a new name/address is given and if so then updates it otherwise it stays the same
                users.name = updateUser.name ? updateUser.name : users.name;
                users.address = updateUser.address ? updateUser.address : users.address;

                //send back a response that the user was updated
                response.json({ message: "User was updated with new infomation", users });
            }
        });
    } else {
        //give no user found by given id
        response.status(400).json({ message: `No user found by id of ${request.params.id}` });
    }
});

//deleting an user
router.delete('/:id', (request, response) => {
    //response.send(request.params.id) gets 4 from http://localhost:5000/api/users/4
    const found = users.some(users => users.id === parseInt(request.params.id));

    //checks if there is an users by that given id
    if (found) {
        response.json({ message: "User deleted. Bye...", users: users.filter(users => users.id !== parseInt(request.params.id)) });
    } else {
        //give no user found by given id
        response.status(400).json({ message: `No user found by id of ${request.params.id}` });
    }
});

module.exports = router;