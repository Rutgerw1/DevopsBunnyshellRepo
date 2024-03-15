/* eslint-env jest */

const {db, client} = require('../../services/database');
const {getAllUsers, insertUser} = require('../../repositories/user');
const User = require('../../models/user');

describe('User repository tests', () => {
    beforeEach(async () => {
        await db.collection('users').deleteMany({});
    });

    afterAll(async () => {
        await client.close();
    });

    it('Should get all users from the database', async () => {
        const expected = [
            new User({name: 'Test user 1'}),
            new User({name: 'Test user 2'}),
        ];

        await db.collection('users').insertMany(expected);

        const users = await getAllUsers();
        expect(users).toBeDefined();
        expect(users).toHaveLength(2);
        expect(users[0].name).toEqual(expected[0].name);
        expect(users[1].name).toEqual(expected[1].name);

        await db.collection('users').deleteMany({});
    });

    it('Should insert a user into the database', async () => {
        const user = new User({name: 'Test user'});

        await insertUser(user);

        const insertedUser = await db.collection('users').findOne();
        expect(insertedUser).toBeDefined();
        expect(insertedUser.name).toEqual(user.name);
    });
});