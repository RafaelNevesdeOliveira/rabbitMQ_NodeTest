var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost:5672", function (err, conn) {
  if (err) {
    console.error("Erro na conexão:", err);
    return;
  }

  conn.createChannel(function (err, ch) {
    if (err) {
      console.error("Erro ao criar o canal:", err);
      return;
    }

    var channelName = "hello";
    var msg = "Hello World 123!";
    ch.assertQueue(channelName, { durable: false });
    ch.sendToQueue(channelName, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () {
    conn.close();
    process.exit(0);
  }, 500);
});
