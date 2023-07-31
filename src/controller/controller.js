import RabbitMQConfig from "../config/config.js";

const sendMessageToRedis = async (req, res) => {
  try {
    const { message } = req.body;
    const queue = "my-queue";
    const rabbitMQConfig = new RabbitMQConfig();

    // open connection
    await rabbitMQConfig.connect();

    // send message to publish
    await rabbitMQConfig.createQueue(queue);
    await rabbitMQConfig.publishToQueue(queue, message);

    // close connection
    await rabbitMQConfig.close();

    res.status(200).json({
      status: "OK!",
      message: "Message successfully send!",
    });
  } catch (err) {
    console.log(err);
  }
};

const controllers = { sendMessageToRedis };

export default controllers;
