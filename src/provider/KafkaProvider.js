import kafka from 'kafka-observable'
import dotenv from 'dotenv';

dotenv.config();

let opts = {brokers: process.env.KAFKA_BROKER};

let kf = kafka(opts);

module.exports = kf;