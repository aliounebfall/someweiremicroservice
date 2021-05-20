import * as NFTTransferSubscriber from "../subscriber/NFTTransferSubscriber";
import * as NFTTransferProducer from "../producer/NFTTransferProducer";
import Storage from '../utils/Storage';
import web3 from "../provider/Web3Provider";

import logger from '../utils/Logger';

const tag = 'NFT_TRANSFER_SERVCE';

export async function produceNFTTransferFromEvent(nftAddress){

    let subscriber = await NFTTransferSubscriber.NFTTransferListenerSubscribe(nftAddress);

    let storage = await Storage;

    let currentBlockNumber = await storage.getItem('currentBlock');

    subscriber.on('data', (data)=>{
        try {
            let blockNumber = data.blockNumber;
            if(blockNumber > currentBlockNumber) {
                let transferObject = {
                    blockNumber: blockNumber,
                    nft: nftAddress,
                    tx: data.transactionHash,
                    from: '0x'+data.topics[1].slice(26),
                    to: '0x'+data.topics[2].slice(26),
                    tokenId: web3.utils.hexToNumber(data.topics[3])
                };
                // Event is from regular transfer and not from mint
                if(parseInt(transferObject.from) != 0){
                    logger.info(`${tag} : Received updated transfer event for ${nftAddress} - ${JSON.stringify(transferObject)}`);

                    storage.updateItem('currentBlock', blockNumber);
    
                    let producer = NFTTransferProducer
                        .NFTTransferListenerProduce(transferObject);
    
                    producer.subscribe(message => 
                            logger.info(`${tag} : sent transfer event for ${nftAddress} - ${JSON.stringify(message)}`));
                }
            }
        } catch (error) {
            logger.error(`${tag} : ${error}`);
        }
    }).on('connected', (id) => {
        logger.info(`${tag} : Attached transfer event subscriber for ${nftAddress}`);
    }).on('error', (errorObject) =>{
        logger.error(`${tag} : ${errorObject}`);
    });

    return NFTTransferSubscriber.transferSubscritions;
}