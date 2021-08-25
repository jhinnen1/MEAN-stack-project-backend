// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect("mongodb+srv://dbUser:DTZJth5ffSLawx@cluster0.jzrpd.mongodb.net/NatPoints?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

// Configuration
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Users = mongoose.model('Users', {
    email: String,
    password: String
});


// Get all users
app.get('/api/admin/users', function (req, res) {
    console.log("Listing all users...");
    //use mongoose to get all users in the database
    Users.find(function (err, users) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(users); // return all users in JSON format
    });
});

// Create a user
app.post('/api/admin/users', function (req, res) {
    console.log("Creating new user...");
    Users.create({
        email: req.body.email,
        password: req.body.password,
       }, function (err, user) {
        if (err) {
            res.send(err);
        }
        // create and return all users
        Users.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });
});

// Delete a user
app.delete('/api/admin/users/:id', function (req, res) {
    console.log("Deleting user... ", req.params.id);
    Users.findOneAndRemove({  
        _id: req.params.id
    }, function (err, users) {
        if (err) {
            console.error("Error deleting user", err);
        }
        else {
            Users.find(function (err, users) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(users);
                }
            });
        }
    });
});

// Get one user
app.get('/api/admin/users/:id', function (req, res) {

    console.log("List one user...");
    
    //use mongoose to get a single user from the database
    Users.find({ _id: req.params.id }, function (err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(users); // return the user in JSON format
    });
});


/*
// Update a user
app.put('/api/admin/users/:id', function (req, res) {
    const users = {
        email: req.body.email,
        password: req.body.password
    };
    console.log("Updating user... ", req.params.id);
    Users.update({_id: req.params.id}, users, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


/*
// Get one grocery item
app.get('/api/groceries/:id', function (req, res) {

    console.log("List one grocery item...");
    
    //use mongoose to get a single grocery item from the database
    Grocery.find({ _id: req.params.id }, function (err, groceries) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(groceries); // return the grocery item in JSON format
    });
});

// Create a grocery Item
app.post('/api/groceries', function (req, res) {

    console.log("Creating grocery item...");

    Grocery.create({
        name: req.body.name,
        quantity: req.body.quantity,
        done: false
    }, function (err, grocery) {
        if (err) {
            res.send(err);
        }

        // create and return all the groceries
        Grocery.find(function (err, groceries) {
            if (err)
                res.send(err);
            res.json(groceries);
        });
    });

});

// Update a grocery Item
app.put('/api/groceries/:id', function (req, res) {
    const grocery = {
        name: req.body.name,
        quantity: req.body.quantity
    };
    console.log("Updating grocery item... ", req.params.id);
    Grocery.update({_id: req.params.id}, grocery, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});



*/

// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Nature Points server listening on port  - ", (process.env.PORT || 8080));
