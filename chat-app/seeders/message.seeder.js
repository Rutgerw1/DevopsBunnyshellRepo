const Message = require('../models/message');
const messageRepository = require('../repositories/message');

const seedMessages = async function () {
    if (await messageRepository.getAllMessages().then(m => m.length > 0)) {
        console.log('Messages already seeded');
        return;
    }

    console.log('Seeding messages');
    const messages = [
        new Message({user: 'John Doe', text: 'Hi Jane!'}),
        new Message({user: 'Jane Doe', text: 'Good day, John!'}),
    ];

    for (const message of messages) {
        await messageRepository.insertMessage(message);
    }
};

module.exports = {
    seedMessages,
}