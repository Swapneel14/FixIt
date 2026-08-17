import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/express";

import User from "../models/User.js";
import { success } from "zod";



//GET Current User:-

export const getCurrentUser = async (req, res) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        //Getting the user from Clerk

        const clerkUser = await clerkClient.users.getUser(userId);

        //Getting the Email

        const email = clerkUser.emailAddresses[0]?.emailAddress;

        if (!email) {
            return res.status(400).json({
                message: "Email Not Found",
            });
        }

        //Finding The Profile in MongoDB via email
        const user = await User.findOne({
            email: email.toLowerCase(),
        })

        //User Doesn't exists ? -> return error
        if (!user) {
            return res.status(404).json({
                exists: false,
                message: "User's Profile is Incomplete",
            });
        }

        //User exists
        return res.status(200).json({
            exists: true,
            user,
        });
    }
    catch (error) {
        console.error(
            "Get current user error:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

//Add a New User to MongoDB;

export const createUser = async(req,res)=>{
    try{
        console.log("Authorization:", req.headers.authorization);
        const {userId} = getAuth(req);
        const auth = getAuth(req);

console.log(auth);
console.log(req.auth);

         if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const clerkUser = await clerkClient.users.getUser(userId);
        
        

        const email =  clerkUser.emailAddresses[0]?.emailAddress?.toLowerCase();

         if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email not found.",
            });
        }

        const  existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message : "User profile already Exists",

        })
        }

        const user = await User.create({
            email,
            ...req.body
        })
        
        return res.status(201).json({
            success: true,
            message: "Profile created successfully.",
            user,
        });


    }
    catch(error){
        console.log(error);
        console.error("Create user error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        }); 

    }
}

//Edit Current User:-
 export const updateCurrentUser = async(req,res)=>{
    try{
       

      const { userId } = getAuth(req);
      const clerkId = userId;

       if(!clerkId){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
       }

       const clerkUser = await clerkClient.users.getUser(clerkId);
       const email = clerkUser.emailAddresses[0]?.emailAddress;

       if (!email) {
            return res.status(400).json({
                success: false,
                message: "User email not found"
            });
        }

       //fetching mongo User
       const user = await User.findOne({
            email: email.toLowerCase()
        });
       
         if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

         const {
            name,
            profileImage,
            services,
            location,
            bio,
            experience
        } = req.body;

        if (name !== undefined) {
            user.name = name;
        }


        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }


        if (services !== undefined) {
            user.services = services;
        }


        if (location !== undefined) {
            user.location = location;
        }


        if (bio !== undefined) {
            user.bio = bio;
        }


        if (experience !== undefined) {
            user.experience = experience;
        }
        
        const updatedUser = await user.save();


        return res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            user: updatedUser

        });

    }catch(err){

        console.error(
            "Update profile error:",
            err
        );

        return res.status(500).json({

            success: false,

            message: "Failed to update profile"

        });

    }
 }


