import { clerkClient, getAuth} from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);

        // No token / invalid authentication
        if (!userId) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

        }

        //Get Clerk User
         const clerkUser =
            await clerkClient.users.getUser(userId);


        const email =
            clerkUser.emailAddresses[0]?.emailAddress;

        if (!email) {

            return res.status(401).json({

                success: false,

                message: "User email not found"

            });

        }

        //Find Mongo User
          const user =
            await User.findOne({

                email: email.toLowerCase()

            });

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User profile not found"

            });

        }

        //Store Authenticated User and Move to your controller
        //function
        req.clerkUserId = userId;
        req.user = user;
        next();

    }

    catch (e) {
        console.log("Authentication Error", e);
        return res.status(401).json({

            success: false,

            message: "Invalid authentication token"

        });

    }
}