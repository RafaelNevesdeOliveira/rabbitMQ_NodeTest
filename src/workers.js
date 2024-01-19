var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost:5672", function (err, conn) {
  if (err) {
    console.error("Erro na conexão:", err);
    return;
  }

  // Encerramento Gracioso: Adicionado um ouvinte de evento SIGINT (gerado, por exemplo, pelo CTRL+C no terminal) para fechar a conexão com o RabbitMQ antes de encerrar o aplicativo.
  process.on("SIGINT", () => {
    console.log("Encerrando...");
    conn.close();
    process.exit(0);
  });

  conn.createChannel(function (err, ch) {
    if (err) {
      console.error("Erro ao criar o canal:", err);
      conn.close();
      return;
    }

    var channelName = "hello";

    ch.assertQueue(channelName, { durable: false });
    ch.prefetch(1);
    console.log(
      " [*] Waiting for messages in %s. To exit press CTRL+C",
      channelName
    );

    ch.consume(
      channelName,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        ch.ack(msg);
      },
      // Acknowledge das Mensagens: Ao configurar noAck: false, você está dizendo ao RabbitMQ para esperar uma confirmação (ack) para cada mensagem processada. Isso evita a perda de mensagens caso o consumidor caia antes de processá-las.
      { noAck: false }
    );
  });
});
