import express from "express";

import { clerkMiddleware } from "@clerk/express";

import {
    getNearbyProviders,
    getProviderbyId
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

//Get Single Provider from Id
router.get(
    "/:id",
    getProviderbyId
)


export default router;