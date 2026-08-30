import "dotenv/config";

import { Worker } from "bullmq";

import redisConnection from "../config/redis.js";
import resend from "../config/resend.js";


const emailWorker = new Worker(
    "email-queue",

    async (job) => {

        console.log(
            `📩 Processing Job ${job.id}`
        );

        const {
            to,
            subject,
            message
        } = job.data;


        console.log("📤 FROM:", process.env.RESEND_SENDER_EMAIL);
        console.log("📥 TO:", to);


        const { data, error } =
            await resend.emails.send({

                from:
                    `FixIt <${process.env.RESEND_SENDER_EMAIL}>`,

                to: [to],

                subject: subject,

                text: message,

                html: `
                    <h2>${subject}</h2>

                    <p>
                        ${message}
                    </p>

                    <hr>

                    <p>
                        <strong>FixIt</strong>
                    </p>
                `
            });


        if (error) {

            console.error(
                "❌ Resend error:",
                error
            );

            throw new Error(
                error.message
            );
        }


        console.log(
            "✅ Email sent:",
            data.id
        );


        return data;
    },


    {
        connection: redisConnection
    }
);


// ==========================================
// WORKER EVENTS
// ==========================================

emailWorker.on(
    "completed",
    (job) => {

        console.log(
            `✅ Job ${job.id} completed`
        );

    }
);


emailWorker.on(
    "failed",
    (job, error) => {

        console.error(
            `❌ Job ${job?.id} failed:`,
            error
        );

    }
);


emailWorker.on(
    "error",
    (error) => {

        console.error(
            "❌ Worker error:",
            error
        );

    }
);


console.log(
    "🚀 Email worker is running..."
);