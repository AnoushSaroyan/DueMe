const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/User');
const Task = require("./models/Task");
const Project = require("./models/Project");
const Team = require("./models/Team");
const Message = require("./models/Message");
const Chat = require("./models/Chat");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
const app = express();
const path = require("path");
const schema = require('./schema/schema'); 
const cors = require('cors');

// subscription server 
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
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

/* create SubscriptionServer instance, with your GraphQL schema, execute and subscribe (from graphql package) */


// // Create WebSocket listener server
// // const websocketServer = createServer((request, response) => {
// //     response.writeHead(404);
// //     response.end();
// // });
const websocketServer = createServer(app);

const subscriptionServer = SubscriptionServer.create(
    {
        execute,
        subscribe,
        schema,
    },
    {
        server: websocketServer,
        path: "/",
    },
);

const WS_PORT = process.env.PORT || 5000; // later on when you're done with the docker remember to change this according to the process.env.PORT || 5000 for heroku

// // Bind it to port and start listening
websocketServer.listen(WS_PORT, () => console.log(
    `Websocket Server is now running on http://localhost:${WS_PORT}`
));


module.exports = app;