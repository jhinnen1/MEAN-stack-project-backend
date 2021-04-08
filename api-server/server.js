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

//CORS configuration
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


// Get all users items
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

// Create a User
app.post('/api/users', function (req, res) {
    console.log("Creating new user...");
    Users.create({
        email: req.body.name,
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


// Delete a grocery Item
app.delete('/api/groceries/:id', function (req, res) {
    console.log("Deleting grocery item... ", req.params.id);
    Grocery.findOneAndRemove({   //updated from .remove - https://stackoverflow.com/questions/50283081/mongodb-error-cannot-use-retryable-writes-with-limit-0
        _id: req.params.id
    }, function (err, grocery) {
        if (err) {
            console.error("Error deleting grocery ", err);
        }
        else {
            Grocery.find(function (err, groceries) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(groceries);
                }
            });
        }
    });
});
*/

// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Nature Points server listening on port  - ", (process.env.PORT || 8080));