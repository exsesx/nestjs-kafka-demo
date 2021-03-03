# Nest.js Kafka Demo

## Setup

### Kafka, its dependencies and Kafdrop (Kafka UI)

```bash
$ docker-compose -f docker-compose.dev.yml up # to start

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

You'll see "Saved the Kingdom!" text message.

The purpose of this repository is to show the demo interaction within a distributed system.

## Worth Mentioning

Kafdrop (Kafka Web UI) will be available at http://localhost:9000 after the Kafka launch (docker compose).
