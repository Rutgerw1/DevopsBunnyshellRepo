const express = require('express');
const router = express.Router();
const { connectToMessageQueue } = require('../../services/message_bus');

const messageRepository = require('../../repositories/message');

router.get('/', async function (req, res) {
    const messages = await messageRepository.getAllMessages();
    res.json(messages);
});

router.post('/', async function (req, res) {
    let message = req.body;
    console.log(message);
    if (typeof message !== 'undefined') {
        const channel = await connectToMessageQueue();
        channel.assertExchange('directExchange', 'direct', { durable: true });
        channel.publish('directExchange', 'directRoutingKey', Buffer.from(JSON.stringify(message)));
        messageRepository.insertMessage(message)
            .then((message) => {
                res.status(201).json({message: message});
            })
            .catch((err) => {
                res.status(500).json({error: err});
            });
    }
    else {
        res.status(500).json({error: 'Invalid post'});
    }
    
});

module.exports = router;