const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

async function getCachedRate(key) {
  return await getAsync(key);
}

async function setCachedRate(key, value, ttl) {
  await setAsync(key, value, 'EX', ttl);
}

module.exports = { getCachedRate, setCachedRate };
