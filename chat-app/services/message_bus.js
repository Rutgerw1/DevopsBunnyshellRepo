const amqp = require('amqplib');

const connectToMessageQueue = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        return channel;
    } catch (err) {
        console.error('Error connecting to RabbitMQ', err.message);
        throw err;
    }
};

module.exports = {connectToMessageQueue};