const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')
const fs = require('fs')
const https = require('https')
const pythonRunner = require('./services/pythonScriptRuner')
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./GraphQL/schema');
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')   

/**
 * GraphQL
 */
// graphqlSchema contains resolver
// app.use('/graphql', graphqlHTTP({
//     schema: graphqlSchema,
//     graphiql: true
// }));




async function startApolloServer() {
    process.env.NODE_ENV = 'production'
    const configurations = {
      // Note: You may need sudo to run on port 443
      production: { ssl: true, port: 443, hostname: 'backend01.herctek.com' },
      // development: { ssl: false, port: 4000, hostname: 'localhost' },
    };
  
    // const environment = process.env.NODE_ENV || 'production';
    const config = configurations['production'];
  
    const server = new ApolloServer({ 
      typeDefs, 
      resolvers,
      context: (req, connection) => {
        console.log("req", req)
      
        return { req }
      },
    });
    await server.start();
  
    const app = express();
    // const { analysisToken } = require('./util/tokenUtil')
    const { filterUnauthorized, filterUnauthForCourse } = require('./util/filterUtil')
    const cors = require('cors') 
    app.use(cors());
    // app.use(analysisToken);
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    
    app.listen(3000, function () {
        console.log('server running on port 3000: http://localhost:3000');
    })
    app.get('/', async (req, res) => {
        res.send('ok')
    })

    app.post('/api/py-script-result', filterUnauthorized, pythonRunner.writePyFile, pythonRunner.runPyScript);


    server.applyMiddleware({ app });
  
    // Create the HTTPS or HTTP server, per configuration
    let httpServer;
    if (config.ssl) {
      // Assumes certificates are in a .ssl folder off of the package root.
      // Make sure these files are secured.
      httpServer = https.createServer(
        {
        //   key: fs.readFileSync(`./ssl/${environment}/server.key`),
        //   cert: fs.readFileSync(`./ssl/${environment}/server.crt`),
            key: fs.readFileSync(`./certs/server.key`),
            cert: fs.readFileSync(`./certs/server.crt`),
        },
  
        app,
      );
    } else {
      httpServer = http.createServer(pp);
    }
  
    await new Promise(resolve =>
      httpServer.listen({ port: config.port }, resolve),
    );
  
    console.log(
      '🚀 Server ready at',
      `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
        server.graphqlPath
      }`,
    );
  
    return { server, app };
}
startApolloServer();

// Connect to MongoDB
const connectDB = async () => {
    let dbURL = config.mongo_url;
    const conn = await mongoose.connect(dbURL, config.connect_options);
    // conn.db.dropCollection('users')
    console.log(`MongoDB Connected`);
}
connectDB();

// app.get('/module1', filterUnauthorized, filterUnauthForCourse, (req, res) => {
//     res.send('ok')
// }).listen(80)