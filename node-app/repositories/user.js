const {db} = require('../services/database');

const getAllUsers = async () => {
    try {
        return await db.collection('users').find().toArray();
    } catch (err) {
        return err;
    }
};

const insertUser = async (user) => {
    try {
        const result = await db.collection('users').insertOne(user);
        const insertedUser = await db.collection('users').findOne({ _id: result.insertedId });
        return insertedUser;
    } catch (err) {
        return err;
    }
};

module.exports = {getAllUsers, insertUser};