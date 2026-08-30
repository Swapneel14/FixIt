import {Queue} from 'bullmq';
import redisConnection from '../config/redis.js';

const emailQueue = new Queue(
    "email-queue",//name of the Queue
    {
      connection:redisConnection
    }

);

emailQueue.on("error", (error) => {

    console.error(
        "Email Queue Error:",
        error
    );

});


export default emailQueue;