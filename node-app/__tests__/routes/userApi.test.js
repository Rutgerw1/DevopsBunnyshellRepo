/* eslint-env jest */

const request = require('supertest');
const app = require('../../app');

const { db, client } = require('../../services/database');

const User = require('../../models/user');

describe('User route tests', () => {
    beforeEach(async () => {
        await delay(1000);
        await db.collection('users').deleteMany({});
    });

    afterAll(async () => {
        await client.close();
    });

    it('Should get all users', async () => {
        const expected = [
            new User({name: 'Test user 1'}),
            new User({name: 'Test user 2'}),
        ]
        
        await db.collection('users').insertMany(expected);
        const res = await request(app).get('/api/users');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
        expect(res.body[0].name).toEqual(expected[0].name);
        expect(res.body[1].name).toEqual(expected[1].name);
    });

    it('Should create a new user', async () => {
        const newUser = new User({name: 'Test user'});

        const res = await request(app)
            .post('/api/users')
            .send(newUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user._doc.name).toEqual(newUser.name);
    });

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});