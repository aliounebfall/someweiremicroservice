# someweiremicroservice

A **Node.js microservices**, that connects to a local **Ganache ETH node**, and subscribes to events on Weivellite, Weither and Weillenium ERC20 Tokens, and Artifact ERC721 Token.

The service then publishes events to a **Kafka** node, to subscribers.

To run the microservice, you will need : 

* **Docker** : Install Docker, to pull images of Kafka, Zookeeper, Ganache and Neo4j.

* A **Ganache-Cli** node, to simulate an ETH blockchain node, and subscribe to the tokens events. Pull the docker image **trufflesuite/ganache-cli**

* A **Zookeeper** node, to manage Kafka group ids. Pull the docker image **zookeeper**.

* A **Kafka** node, to publish transfer events for Weive Tokens and the Artifact Token to the subscribers. Pull the docker image **confluentinc/cp-kafka**.
