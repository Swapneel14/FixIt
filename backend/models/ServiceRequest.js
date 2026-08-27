import mongoose from "mongoose";


const serviceRequestSchema = new mongoose.Schema(

    {

        // ==========================================
        // CUSTOMER
        // ==========================================

        customer: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // ==========================================
        // PROVIDER
        // ==========================================

        provider: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // ==========================================
        // SERVICE
        // ==========================================

        service: {

            type: String,

            required: true,

            enum: [

                "AC_REPAIR",
                "LAPTOP_REPAIR",
                "ELECTRICIAN",
                "CAR_MECHANIC",
                "PLUMBER"

            ]

        },


        // ==========================================
        // CUSTOMER'S PROBLEM
        // ==========================================

        issueDescription: {

            type: String,

            required: true,

            trim: true,

            maxlength: 1000

        },


        // ==========================================
        // PREFERRED DATE
        // ==========================================

        preferredDate: {

            type: Date,

            required: true

        },


        // ==========================================
        // PREFERRED TIME
        // ==========================================

        preferredTime: {

            type: String,

            required: true

        },


        // ==========================================
        // SERVICE LOCATION
        // ==========================================

        location: {

            type: {

                type: String,

                enum: ["Point"],

                required: true

            },

            coordinates: {

                type: [Number],

                required: true

            }

        },


        // ==========================================
        // REQUEST STATUS
        // ==========================================

        status: {

            type: String,

            enum: [

                "PENDING",
                "ACCEPTED",
                "REJECTED"

            ],

            default: "PENDING"

        },


        // ==========================================
        // SERVICE PRICE
        // ==========================================

        price: {

            type: Number,

            default: null

        }

    },

    {

        timestamps: true

    }

);


// ==========================================
// GEO INDEX
// ==========================================

serviceRequestSchema.index({

    location: "2dsphere"

});


const ServiceRequest = mongoose.model(

    "ServiceRequest",

    serviceRequestSchema

);


export default ServiceRequest;