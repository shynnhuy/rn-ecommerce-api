const redis = require("redis");
const client = redis.createClient({
  port: 6379,
  host: "localhost",
});

// client.on("connect", () => {
//   console.log("Client connected to redis...");
//   success({
//     message: `Connected to MongoDB`,
//     badge: true,
//   });
// });

client.on("ready", () => {
  console.log(`Client connected to redis and ready to use...`);
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log(`Client disconnected from redis`);
});

// process.on("SIGINT", () => {
//   client.quit();
// });

module.exports = client;
