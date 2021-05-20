import kafka from '../provider/KafkaProvider';

const tag = 'TOKEN_PRODUCER';

export let transferProducers = new Map();
let kf = kafka;

export function TokenTransferListenerProduce(tokenAddress, transferObject){
    let topic = getTopic(tokenAddress);
    let producer = kf.toTopic(topic, transferObject);

    transferProducers.set(transferObject.tx, producer);

    return producer;
}

function getTopic(tokenAddress){
    let topic;

    switch (tokenAddress) {
        case process.env.ETH_WEIVELLITE_ERC20:
            topic = process.env.KAFKA_TOPIC_WEIVELLITE;
            break;
        case process.env.ETH_WEITHER_ERC20:
            topic = process.env.KAFKA_TOPIC_WEITHER;
            break;
        case process.env.ETH_WEILLENIUM_ERC20:
            topic = process.env.KAFKA_TOPIC_WEILLENIUM;
            break;
        default:
            break;
    }

    return topic;
}