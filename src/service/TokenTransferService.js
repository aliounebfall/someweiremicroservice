import * as TokenTransferSubscriber from "../subscriber/TokenTransferSubscriber";
import * as TokenTransferProducer from "../producer/TokenTransferProducer";
import Storage from '../utils/Storage';
import web3 from "../provider/Web3Provider";

import logger from '../utils/Logger';

const tag = 'TOKEN_SERVCE';

export async function produceTokenTransferFromEvent(tokenAddress){

    let subscriber = await TokenTransferSubscriber.TokenTransferListenerSubscribe(tokenAddress);

    let storage = await Storage;

    let currentBlockNumber = await storage.getItem('currentBlock');

    subscriber.on('data', (data)=>{
        try {
            let blockNumber = data.blockNumber;
            if(blockNumber > currentBlockNumber) {
                let transferObject = {
                    blockNumber: blockNumber,
                    token: tokenAddress,
                    tx: data.transactionHash,
                    from: '0x'+data.topics[1].slice(26),
                    to: '0x'+data.topics[2].slice(26), 
                    amount: web3.utils.hexToNumber(data.data)
                };

                logger.info(`${tag} : Received updated transfer event for ${tokenAddress} - ${JSON.stringify(transferObject)}`);

                storage.updateItem('currentBlock', blockNumber);

                let producer = TokenTransferProducer
                    .TokenTransferListenerProduce(tokenAddress, transferObject);

                producer.subscribe(message => 
                        logger.info(`${tag} : sent transfer event for ${tokenAddress} - ${JSON.stringify(message)}`));

            } else {
                logger.error(`${tag} : Received obsolete transfer event for ${tokenAddress} - ${JSON.stringify(transferObject)}`);
            }
        } catch (error) {
            logger.error(`${tag} : ${error}`);
        }
    }).on('connected', (id) => {
        logger.info(`${tag} : Attached transfer event subscriber for ${tokenAddress}`);
    }).on('error', (errorObject) =>{
        logger.error(`${tag} : ${errorObject}`);
    });


    return TokenTransferSubscriber.transferSubscritions;
}