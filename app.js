import * as TokenTransferService from './src/service/TokenTransferService';
import * as NFTMintService from './src/service/NFTMintService';
import * as NFTTransferService from './src/service/NFTTransferService';

import dotenv from 'dotenv';
import logger from './src/utils/Logger';;

const tag = 'SOMEWEIRE MICROSERVICE';

const ethNode = process.env.ETH_NODE_WS;
const kafkaBroker = process.env.KAFKA_BROKER;
const port = process.env.APP_PORT;

const log = `\n-LISTENING ON PORT : ${port}\n-ETH NODE URL: ${ethNode}\n-KAFKA BROKER URL: ${kafkaBroker}`;

const WVTS = process.env.ETH_WEIVELLITE_ERC20;
const WTRS = process.env.ETH_WEITHER_ERC20;
const WNMS = process.env.ETH_WEILLENIUM_ERC20;
const ARTFCS = process.env.ETH_ARTIFACT_ERC721;

const tokens = [WVTS, WTRS, WNMS];

dotenv.config();

// Attach transfer event listeners to all tokens
tokens.forEach(token => TokenTransferService.produceTokenTransferFromEvent(token));

// Attach transfer and mint events listeners to NFT token
NFTMintService.produceNFTMintFromEvent(ARTFCS);
NFTTransferService.produceNFTTransferFromEvent(ARTFCS);

// TODO : Attach events from Bid

logger.info(`${tag} :${log}`);