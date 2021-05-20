import kafka from '../provider/KafkaProvider';

const tag = 'NFT_MINT_PRODUCER';

export let transferProducers = new Map();
let kf = kafka;

export function NFTMintListenerProduce(transferObject){
    let topic = process.env.KAFKA_TOPIC_ARTIFACT_MINT;
    let producer = kf.toTopic(topic, transferObject);

    transferProducers.set(transferObject.tx, producer);

    return producer;
}