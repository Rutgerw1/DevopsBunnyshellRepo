/* eslint-env jest */

const {db, client} = require('../../services/database');
const {getAllMessages, insertMessage} = require('../../repositories/message');
const Message = require('../../models/message');

describe('Message repository tests', () => {
    beforeEach(async () => {
        await db.collection('messages').deleteMany({});
    });

    afterAll(async () => {
        await client.close();
    });

    it('Should get all messages from the database', async () => {
        const expected = [
            new Message({text: 'Test message 1.'}),
            new Message({text: 'Test message 2.'}),
        ];

        await db.collection('messages').insertMany(expected);

        const messages = await getAllMessages();
        expect(messages).toBeDefined();
        expect(messages).toHaveLength(2);
        expect(messages[0].text).toEqual(expected[0].text);
        expect(messages[1].text).toEqual(expected[1].text);

        await db.collection('messages').deleteMany({});
    });

    it('Should insert a message into the database', async () => {
        const message = new Message({text: 'Test message.'});

        await insertMessage(message);

        const insertedMessage = await db.collection('messages').findOne();
        expect(insertedMessage).toBeDefined();
        expect(insertedMessage.text).toEqual(message.text);
    });
});