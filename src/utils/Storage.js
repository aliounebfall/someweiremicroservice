import storage from 'node-persist';
import path from "path";
import logger from './Logger';

const storagePath= path.join(process.cwd(), 'storage');

const opts = {
    dir: storagePath,
    stringify: JSON.stringify,
    parse: JSON.parse,
    logging: log
}

module.exports = async function() {

    await storage.init(opts);
    
    if(await storage.length() == 0) {
        storage.setItem('currentBlock', 0);
    }

    return storage;
} ()

function log(message){
    logger.info(message);
}