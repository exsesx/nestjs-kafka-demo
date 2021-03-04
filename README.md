# Nest.js Kafka Demo

<div style="text-align: center" align="center">
    <img alt="Kafka.js" src="docs/kafkajs.svg" style="margin-right: 12px" height="64" />
    <img alt="Nest.js" src="docs/nestjs.svg" height="64" />
</div>

## Setup

### Kafka, its dependencies and Kafdrop (Kafka UI)

```bash
$ docker-compose up # to start

$ docker-compose down # to stop

$ docker-compose down -v --rmi all # full cleanup
```

### Nest.js Producer Service

```bash
$ cd kafka-microservice-client-producer

$ yarn install # install dependencies

$ yarn start:dev
```

### Nest.js Consumer Service

```bash
$ cd kafka-microservice-server-consumer

$ yarn install # install dependencies

$ yarn start:dev
```

## Usage

Check that everything is working correctly by looking at the logs.

To send a new message and consume it, go to: http://localhost:3000/hero

You'll see a success text message.

The purpose of this repository is to show the demo interaction within a distributed system.

## Worth Mentioning

Kafdrop (Kafka Web UI) will be available at http://localhost:9000 after the Kafka launch (docker compose).
