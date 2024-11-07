import mongoose from "mongoose";

const theloaiSchema = new mongoose.Schema(
    {
        tieuDeTheLoai: {
            type: String,
        }
    },{ timestamps: true }
)

const Theloai = mongoose.model("Theloai", theloaiSchema, "Theloai");

export default Theloai;