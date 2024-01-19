# Guia de Integração RabbitMQ com Node.js

Este README fornece uma visão geral do uso do RabbitMQ com Node.js, detalhando os scripts de produtor e consumidor e as definições chave do RabbitMQ.

## Scripts

### `app.js` - Produtor

**Descrição**: 
- Conecta-se ao RabbitMQ.
- Cria um canal e uma fila chamada 'hello'.
- Envia a mensagem 'Hello World 123!' para a fila.
- Fecha a conexão após 500 ms, tempo suficiente para enviar a mensagem.

### `workers.js` - Consumidor

**Descrição**:
- Conecta-se ao RabbitMQ e cria um canal.
- Declara-se como consumidor da fila 'hello'.
- Consome e imprime no console as mensagens recebidas.
- Continua em execução, aguardando novas mensagens, até interrupção manual (CTRL+C).

## Funcionamento em Conjunto

- **Fluxo**:
  Quando `app.js` é executado, envia uma mensagem para a fila 'hello'. Se `workers.js` estiver rodando simultaneamente, receberá e processará essa mensagem. Isso exemplifica o padrão de mensagens do RabbitMQ, onde o produtor envia mensagens para uma fila e o consumidor as processa.

## Iniciando Container RabbitMQ Local

```shell
docker pull rabbitmq:3-management
docker run -d — hostname my-rabbit — name rabbit13 -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```

## DEFINIÇOES

- **Connections** (Conexões)
Uma conexão em RabbitMQ é basicamente uma conexão TCP/IP entre a sua aplicação (por exemplo, uma aplicação Node.js) e o servidor RabbitMQ. Você pode pensar nisso como uma chamada telefônica entre duas pessoas. Para começar a se comunicar, primeiro você precisa estabelecer a chamada.

- **Channels** (Canais)
Um canal é uma via de comunicação dentro da conexão. Se a conexão é uma chamada telefônica, então um canal pode ser visto como uma conversa específica durante essa chamada. Em um único telefone (conexão), você pode ter várias conversas diferentes (canais). Os canais são importantes porque permitem que você envie diferentes tipos de mensagens ou realize diferentes tarefas sem ter que abrir várias conexões.

- **Exchanges** (Trocas)
Os exchanges são como centrais de correios em RabbitMQ. Eles recebem mensagens e as encaminham para as filas certas, com base em regras específicas. Você pode pensar em um exchange como um distribuidor que decide para onde enviar uma carta (mensagem) com base no endereço (regras de roteamento).

- **Queues** (Filas)
As filas são como caixas de correio onde as mensagens são guardadas até serem processadas. Uma fila é onde as mensagens ficam esperando até que um worker (trabalhador) as pegue para processar.

- **Workers** (Trabalhadores)
Os workers são os processos que efetivamente fazem o trabalho de pegar mensagens das filas e processá-las. Pode-se pensar neles como os funcionários do correio que pegam as cartas das caixas de correio e as entregam aos destinatários.