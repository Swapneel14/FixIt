import express from 'express';

import { clerkMiddleware, requireAuth } from '@clerk/express';
import { getCurrentUser , createUser } from '../controllers/userController.js';

import { createUserSchema } from '../validators/userValidator.js'; 
import validate from '../middlewares/Validator.js';
const router = express.Router();

router.use(clerkMiddleware());


//Get User
router.get("/me",getCurrentUser);

//Create new User
router.post(
    "/",
    validate(createUserSchema),
    createUser
);





export default router;