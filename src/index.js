import express from "express";
import bodyParser from "body-parser";
import controllers from "./controller/controller.js";
import RabbitMQConfig from "./config/config.js";

const app = express();
const jsonParser = bodyParser.json();

app.post("/api/send", jsonParser, controllers.sendMessageToRedis);

// consume from channel redis 'my-channel'
const queue = "my-queue";
const rabbitMQConfig = new RabbitMQConfig();

await rabbitMQConfig.connect();
await rabbitMQConfig.subscribeToQueue(queue, (message) => {
  console.log("Received message: ", message);
});

app.listen(9000, () => {
  console.log("Server is running on port 9000!");
});
