import kafka from '../provider/KafkaProvider';

const tag = 'NFT_TRANSFER_PRODUCER';

export let transferProducers = new Map();
let kf = kafka;

export function NFTTransferListenerProduce(transferObject){
    let topic = process.env.KAFKA_TOPIC_ARTIFACT_TRANSFER;
    let producer = kf.toTopic(topic, transferObject);

    transferProducers.set(transferObject.tx, producer);

    return producer;
}