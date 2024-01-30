import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "You must provide content for the feature"],
        minlength: [10, "Please provide at least 10 characters"],
        maxlength: [300, "Content cannot exceed 300 characters"]
    },
}, { timestamps: true });

export default mongoose.model("Feature", FeatureSchema);
