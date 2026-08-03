import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // User's email from Clerk
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // User's name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Profile picture URL
    profileImage: {
      type: String,
      default: "",
    },

    // User can be CUSTOMER, PROVIDER, or both
    roles: {
      type: [
        {
          type: String,
          enum: ["CUSTOMER", "PROVIDER"],
        },
      ],
      default: ["CUSTOMER"],
    },

    // Services provided by the user
    // Example: ["PLUMBER", "ELECTRICIAN"]
    services: {
      type: [{
        type: String,
        enum: [
          "AC_REPAIR",
          "LAPTOP_REPAIR",
          "PLUMBER",
          "ELECTRICIAN",
          "CAR_MECHANIC",
        ],
      }],
      default: [],
    },

    // User's location
    location: {
      // GeoJSON type
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      // [longitude, latitude]
      coordinates: {
        type: [Number],
        default: [0, 0],
      },

      // Human-readable location
      city: {
        type: String,
        trim: true,
        default: "",
      },

      state: {
        type: String,
        trim: true,
        default: "",
      },
    },

    // Account status
    accountStatus: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "BANNED", "DELETED"],
      default: "ACTIVE",
    },

    // Average rating of the provider
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    // Provider description
    bio: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
  },



  {
    timestamps: true,
  }
);

// Geospatial index
// Used for finding nearby providers
userSchema.index({
  location: "2dsphere",
});

const User = mongoose.model("User", userSchema);

export default User;