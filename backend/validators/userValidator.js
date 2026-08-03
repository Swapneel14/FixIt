import { z } from 'zod';

const ServiceEnum = z.enum([
  "AC_REPAIR",
  "LAPTOP_REPAIR",
  "PLUMBER",
  "ELECTRICIAN",
  "CAR_MECHANIC",
]);

export const createUserSchema = z.object(
    {
        name: z.string()
            .trim()
            .min(3, "Name must be Atleast of length 3")
            .max(50, "Name cannot exceed 50 characters"),

        profileImage: z.string()
            .url("Invalid profile image URL")
            .optional()
            .or(z.literal("")),

        roles: z.array(
            z.enum(["CUSTOMER", "PROVIDER"])
        )
            .min(1, "Please Select 1 role"),

        services: z.array(ServiceEnum).default([]),

        location: z.object({
            type: z.literal("Point"),

            coordinates: z
                .array(z.number())
                .length(2, "Coordinates must contain longitude and latitude."),

            city: z
                .string()
                .trim()
                .min(2, "City is required."),

            state: z
                .string()
                .trim()
                .min(2, "State is required."),
        }),

        experience: z
            .number()
            .min(0, "Experience cannot be negative.")
            .optional(),

        bio: z
            .string()
            .trim()
            .max(500, "Bio cannot exceed 500 characters.")
            .optional(),


    })
    .superRefine((data, ctx) => {

        const isProvider = data.roles.includes("PROVIDER");

        if (isProvider) {
            if (data.services.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["services"],
                    message: "Select at least one service"

                });
            }

            if (
                data.experience === undefined ||
                data.experience === null
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["experience"],
                    message: "Experience is required for providers.",
                });
            }

            if (
                !data.bio ||
                data.bio.trim().length < 20
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["bio"],
                    message:
                        "Bio must contain at least 20 characters.",
                });
            }
        }
    })
