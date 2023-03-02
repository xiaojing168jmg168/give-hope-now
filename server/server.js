const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require('path');

const { typeDefs, resolvers } = require("./schema");
const db = require("./config/connection");
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
//Catch all reqest send to client
if (process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client"))
})

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open',() => {
        app.listen(PORT, () =>{
            console.log("Hello!")
        })
    })
}

startApolloServer(typeDefs, resolvers);