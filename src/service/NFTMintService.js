import * as NFTMintSuscriber from "../subscriber/NFTMintSuscriber";
import * as NFTMintProducer from "../producer/NFTMintProducer";
import Storage from '../utils/Storage';
import web3 from "../provider/Web3Provider";

import logger from '../utils/Logger';

const tag = 'NFT_MINT_SERVCE';

export async function produceNFTMintFromEvent(nftAddress){

    let subscriber = await NFTMintSuscriber.NFTMintListenerSubscribe(nftAddress);

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
                    tokenId: web3.utils.hexToNumber(data.topics[1]),
                    artifactType: web3.utils.hexToNumber(data.topics[2]),
                    artifactRarity: web3.utils.hexToNumber(data.topics[3])
                };

                logger.info(`${tag} : Received updated mint event for ${nftAddress} - ${JSON.stringify(transferObject)}`);

                storage.updateItem('currentBlock', blockNumber);

                let producer = NFTMintProducer
                    .NFTMintListenerProduce(transferObject);

                producer.subscribe(message => 
                        logger.info(`${tag} : sent mint event for ${nftAddress} - ${JSON.stringify(message)}`));
            }
        } catch (error) {
            logger.error(`${tag} : ${error}`);
        }
    }).on('connected', (id) => {
        logger.info(`${tag} : Attached transfer event subscriber for ${nftAddress}`);
    }).on('error', (errorObject) =>{
        logger.error(`${tag} : ${errorObject}`);
    });


    return NFTMintSuscriber.transferSubscritions;
}