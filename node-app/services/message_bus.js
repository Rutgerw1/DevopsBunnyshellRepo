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


const subscribeToChannel = async() => {
    try {
        const channel = await connectToMessageQueue();
            await channel.assertExchange('directExchange', 'direct', { durable: true });
            const queue = await channel.assertQueue('', { exclusive: false });
            await channel.bindQueue(queue.queue, 'directExchange', 'directRoutingKey');
            channel.consume(queue.queue, message => {
                let msg = message.content.toString();
                console.log(msg);
            }, { noAck: true });
        } catch (error) {
            console.error('Failed to connect to RabbitMQ:', error);
        }
}


module.exports = {connectToMessageQueue, subscribeToChannel};