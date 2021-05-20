import web3 from "../provider/Web3Provider";
import logger from '../utils/Logger';

const tag = 'NFT_TOKEN_SUBSCRIBER';

export let transferSubscritions = new Map();

export async function NFTTransferListenerSubscribe(nftAddress){

    let subscriber =  await web3
                .eth
                .subscribe('logs', 
                {
                    address: nftAddress,
                    topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
                });

    transferSubscritions.set(nftAddress, subscriber);

    return subscriber;
}

export async function NFTTransferListenerUnsubscribe(nftAddress){
    return transferSubscritions.get(nftAddress).unsubscribe();
}