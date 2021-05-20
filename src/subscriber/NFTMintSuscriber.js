import web3 from "../provider/Web3Provider";
import logger from '../utils/Logger';

const tag = 'NFT_MINT_SUBSCRIBER';

export let transferSubscritions = new Map();

export async function NFTMintListenerSubscribe(nftAddress){

    let subscriber =  await web3
                .eth
                .subscribe('logs', 
                {
                    address: nftAddress,
                    topics: ['0x82824a95c06b0bfa040a01a4da09485bc1d8bab2b847908b54feaa8e436d1b75']
                });

    transferSubscritions.set(nftAddress, subscriber);

    return subscriber;
}

export async function NFTMintListenerUnsubscribe(nftAddress){
    return transferSubscritions.get(nftAddress).unsubscribe();
}