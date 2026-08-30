import emailQueue from "./queues/emailQueue.js";

const job = await emailQueue.add(
    "test-email",
    {
        to: "duoproject86@gmail.com",

        subject: "FixIt Queue Test",

        message:
            "Hello! This is a test email from FixIt using Redis + BullMQ + Resend."
    }
);

console.log(
    "📩 Email job added successfully"
);

console.log(
    "Job ID:",
    job.id
);

process.exit(0);