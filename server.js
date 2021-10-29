const pythonRunner = require('./services/pythonScriptRuner')
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./GraphQL/schema');
const express = require('express')
const app = express();
const { analysisToken } = require('./util/tokenUtil')
const { filterUnauthorized, filterUnauthForCourse } = require('./util/filterUtil')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')

app.use(cors());
app.use(analysisToken);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(3000, function () {
    console.log('server running on port 3000: http://localhost:3000');
})

app.get('/', async (req, res) => {
    res.send('ok')
})

/**
 * GraphQL
 */
// graphqlSchema contains resolver
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
}));


app.post('/api/py-script-result', filterUnauthorized, pythonRunner.writePyFile, pythonRunner.runPyScript);

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