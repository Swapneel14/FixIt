import express from 'express';
import { createServiceRequest, getMyBookings } from '../controllers/servicerequestController.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.post("/",
    protect,
    createServiceRequest
)

router.get(
    "/my-bookings",
    protect,
    getMyBookings
);

export default router;