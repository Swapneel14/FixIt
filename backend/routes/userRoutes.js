import express from 'express';

import { clerkMiddleware, requireAuth } from '@clerk/express';
import { getCurrentUser , createUser, updateCurrentUser } from '../controllers/userController.js';

import { createUserSchema, updateUserSchema } from '../validators/userValidator.js'; 
import validate from '../middlewares/Validator.js';
const router = express.Router();




//Get User
router.get("/me",getCurrentUser);

//Create new User
router.post(
    "/",
    validate(createUserSchema),
    createUser
);

//Edit New User

router.put("/me",
    validate(updateUserSchema),
    updateCurrentUser
)





export default router;