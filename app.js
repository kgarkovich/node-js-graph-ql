require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers/userResolver');
const { ApolloServer } = require('apollo-server-express');

const app = express();
const PORT = process.env.BASE_PORT || 4000;

const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const server = new ApolloServer({ typeDefs, resolvers });

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
}
  
startApolloServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
});
