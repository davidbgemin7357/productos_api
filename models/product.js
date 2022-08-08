import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
        },
        price: {
            type: Number,
            required: [true, "Product name is required"],
        },
        feature: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 4.5,
        },
        company: {
            type: String,
            // enum: ['ikea', 'liddy', 'caressa', 'marcos']
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not a valid company",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Product", ProductSchema);
