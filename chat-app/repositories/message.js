const {db} = require('../services/database');

const getAllMessages = async () => {
    try {
        return await db.collection('messages').find().toArray();
    } catch (err) {
        return err;
    }
};

const insertMessage = async (message) => {
    try {
        return await db.collection('messages').insertOne(message);
    } catch (err) {
        return err;
    }
}

module.exports = {getAllMessages, insertMessage};