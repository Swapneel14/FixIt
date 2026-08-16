import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dns from "dns";

import { clerkMiddleware , clerkClient} from "@clerk/express";
import userRoutes from "./routes/userRoutes.js";
import providerRoutes from "./routes/providerRouter.js"
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
console.log("Secret:", process.env.CLERK_SECRET_KEY);
dns.setServers(["1.1.1.1","0.0.0.0"]);


const app = express();
const PORT = process.env.PORT || 5000;

const test = async () => {
  try {
    const users = await clerkClient.users.getUserList({ limit: 1 });
    console.log("Connected to Clerk ✅");
    console.log(users.data.length);
  } catch (e) {
    console.error("Cannot connect to Clerk ❌");
    console.error(e);
  }
};

test();

// Middleware
app.use(
  cors({
    origin:
      "http://localhost:5173",

    credentials: true,
  })
);
app.use(express.json());
app.use(
  clerkMiddleware()
);


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Fix It API is running",
  });
});


//User Routes:-
app.use(
  "/api/users",
  userRoutes
);

//Provider Routes
app.use(
  "/api/providers",
  providerRoutes
)
app.use(errorHandler);

// Connect DB and start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();