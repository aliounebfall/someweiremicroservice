import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.ETH_NODE_WS));

module.exports = web3;