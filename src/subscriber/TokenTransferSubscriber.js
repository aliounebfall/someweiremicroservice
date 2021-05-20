import web3 from "../provider/Web3Provider";
import logger from '../utils/Logger';

const tag = 'TOKEN_SUBSCRIBER';

export let transferSubscritions = new Map();

export async function TokenTransferListenerSubscribe(tokenAddress){

    let subscriber =  await web3
                .eth
                .subscribe('logs', 
                {
                    address: tokenAddress,
                    topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
                });

    transferSubscritions.set(tokenAddress, subscriber);

    return subscriber;
}

export async function TokenTransferListenerUnsubscribe(tokenAddress){
    return transferSubscritions.get(tokenAddress).unsubscribe();
}