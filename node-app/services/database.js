const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri);

const db = client.db(process.env.DB_NAME || 'devops_app');

const connect = async function () {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    db: db,
    client: client,
    connect: connect
};