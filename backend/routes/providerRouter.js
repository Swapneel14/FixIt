import express from "express";

import { clerkMiddleware } from "@clerk/express";

import {
    getNearbyProviders
} from "../controllers/providerController.js";


const router = express.Router();


// Clerk middleware
router.use(clerkMiddleware());


// =====================================
// GET NEARBY PROVIDERS
// =====================================

router.get(
    "/nearby",
    getNearbyProviders
);


export default router;