const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/User');
const Category = require("./models/Category");
const Product = require("./models/Product");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
const app = express();
const schema = require('./schema/schema'); 
const cors = require('cors');

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