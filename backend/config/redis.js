import Redis from "ioredis";


const redisConnection = new Redis(
    process.env.REDIS_URL || "redis://localhost:6379",
    {
        maxRetriesPerRequest: null
    }
);


// Redis connected
redisConnection.on("connect", () => {

    console.log("Redis connecting...");

});


// Redis ready
redisConnection.on("ready", () => {

    console.log("Redis connected successfully");

});


// Redis error
redisConnection.on("error", (error) => {

    console.error(
        "Redis Error:",
        error
    );

});


// Redis reconnecting
redisConnection.on("reconnecting", () => {

    console.log(
        "Redis reconnecting..."
    );

});


export default redisConnection;