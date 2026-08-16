import User from "../models/User.js";

export const getNearbyProviders = async (req, res) => {
    try {

        const {
            service = "all",
            radius = 10,
            latitude,
            longitude
        } = req.query;


        // -----------------------------
        // Validate coordinates
        // -----------------------------

        if (!latitude || !longitude) {

            return res.status(400).json({
                success: false,
                message: "Latitude and longitude are required"
            });

        }


        const lat = Number(latitude);
        const lng = Number(longitude);
        const radiusKm = Number(radius);


        if (
            Number.isNaN(lat) ||
            Number.isNaN(lng) ||
            Number.isNaN(radiusKm)
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid location or radius"
            });

        }


        // -----------------------------
        // Build geoNear
        // -----------------------------

        const geoNear = {

            near: {
                type: "Point",
                coordinates: [lng, lat]
            },

            distanceField: "distance",

            spherical: true,

            maxDistance: radiusKm * 1000,

            query: {

                roles: "PROVIDER",

                accountStatus: "ACTIVE"

            }

        };


        // -----------------------------
        // Service filter
        // -----------------------------

        if (service !== "all") {

            geoNear.query.services = service;

        }


        // -----------------------------
        // MongoDB aggregation
        // -----------------------------

        const providers = await User.aggregate([

            {
                $geoNear: geoNear
            },

            {
                $addFields: {

                    distance: {
                        $divide: [
                            "$distance",
                            1000
                        ]
                    }

                }
            },

            {
                $project: {

                    name: 1,

                    email: 1,

                    profileImage: 1,

                    roles: 1,

                    services: 1,

                    location: 1,

                    rating: 1,

                    bio: 1,

                    experience: 1,

                    accountStatus: 1,

                    distance: 1

                }

            },

            {
                $sort: {
                    distance: 1
                }
            }

        ]);


        return res.status(200).json({

            success: true,

            count: providers.length,

            providers

        });

    }

    catch (error) {

        console.error(
            "Get nearby providers error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to fetch nearby providers"

        });

    }
};