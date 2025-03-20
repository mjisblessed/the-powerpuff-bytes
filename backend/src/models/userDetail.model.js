import mongoose, { mongo } from "mongoose";

const detailSchema = new mongoose.Schema(
    {
        domain: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model("UsersData", detailSchema);