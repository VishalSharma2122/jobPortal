import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
 profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume: { type: String }, // URL to resume file
    resumeOrignalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'company' }, // Correct type casing
    profilePhoto: {
        type: String,
        default: "default"
    }
}

}, { timestamps: true });

export const User = mongoose.model('user', userSchema);