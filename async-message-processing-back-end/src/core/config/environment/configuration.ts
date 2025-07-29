export default () => ({
  queue: {
    protocol: process.env.QUEUE_PROTOCOL || 'amqp',
    url: process.env.QUEUE_URL || 'localhost:5672',
    username: process.env.QUEUE_USERNAME || 'default',
    password: process.env.QUEUE_PASSWORD || '',
    prefix: process.env.QUEUE_PREFIX || 'queue.',
    owner: process.env.QUEUE_OWNER || 'default',
  }
});
