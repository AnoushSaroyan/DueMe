const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/User');
const Task = require("./models/Task");
const Project = require("./models/Project");
const Team = require("./models/Team");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
const app = express();
const schema = require('./schema/schema'); 
const cors = require('cors');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static('../client/build'));
    app.use(express.static('client/build'));
    app.get('/', (req, res) => {
        // res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

if (!db) {
    throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

app.use(cors());

app.use(
    "/graphql",  
    // now we are accepting the request in our middleware
    expressGraphQL(req => {
        return {
            schema,
            context: {
                token: req.headers.authorization
            },
            graphiql: true
        };  
    })
);

module.exports = app;