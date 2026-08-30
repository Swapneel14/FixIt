import User from "../models/User.js";
import ServiceRequest from "../models/ServiceRequest.js";
import { clerkClient } from '@clerk/express';
import emailQueue from "../queues/emailQueue.js";

//Get All Bookings

export const getMyBookings = async (req, res) => {
    try {
        const clerkUserId = req.clerkUserId;

        //GET Clerk User

        const clerkUser = await clerkClient.users.getUser(
            clerkUserId
        )

        const email =
            clerkUser.emailAddresses[0]?.emailAddress;


        if (!email) {

            return res.status(400).json({

                success: false,

                message: "User email not found"

            });

        }

        //FIND Mongo User

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User profile not found"

            });

        }

        const bookings =
            await ServiceRequest.find({
                customer: user._id
            })

                .populate(
                    "provider",
                    "name profileImage rating services location"
                )

                .sort({
                    createdAt: -1
                });

        //Send Response
        return res.status(200).json({

            success: true,

            bookings

        });
    }
    catch (error) {
        console.error(
            "Get my bookings error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch bookings"

        });
    }
}



//Create Service Request
export const createServiceRequest = async (req, res) => {
    try {
        const customerId = req.user._id;


        const {
            providerId,
            service,
            issueDescription,
            preferredTime,
            preferredDate,
            location
        } = req.body;

        if (
            !providerId ||
            !service ||
            !issueDescription ||
            !preferredDate ||
            !preferredTime ||
            !location
        ) {

            return res.status(400).json({

                success: false,

                message: "All required fields are required"

            });

        }

        const provider = await User.findOne({
            _id: providerId,
            roles: "PROVIDER",
            accountStatus: "ACTIVE"
        })

        if (!provider) {

            return res.status(404).json({

                success: false,

                message: "Provider not found"

            });

        }

        const serviceRequest = await ServiceRequest.create({
            customer: customerId,

            provider: providerId,

            service,

            issueDescription,

            preferredDate,

            preferredTime,

            location,

            status: "PENDING"
        })

     

        const customer = await User.findById(customerId);
        await emailQueue.add(
    "booking-created-provider",
    {
        to: provider.email,

        subject: "New Service Request - FixIt",

        message: `
            You have received a new service request.

            Service: ${service}

            Issue:
            ${issueDescription}

            Preferred Date: ${preferredDate}

            Preferred Time: ${preferredTime}
        `
    }
);


await emailQueue.add(
    "booking-created-customer",
    {
        to: customer.email,

        subject: "Booking Confirmed - FixIt",

        message: `
            Your service request has been successfully created.

            Service: ${service}

            Issue:
            ${issueDescription}

            Preferred Date: ${preferredDate}

            Preferred Time: ${preferredTime}

            Status: PENDING
        `
    }
);

        return res.status(201).json({

            success: true,

            message:
                "Service request created successfully",

            serviceRequest

        });
    }

    catch (error) {
        console.error(
            "Create service request error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to create service request"

        });
    }
}