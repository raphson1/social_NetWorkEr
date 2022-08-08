const { connect, connection } = require('mongoose');

const connectionString = 
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myApiDB';

    connect(connectionString, {
        useNewUrlParser: true,
        useUniFiedTopology: true
    });

module.exports = connection;