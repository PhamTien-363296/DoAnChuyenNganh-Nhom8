import mongoose from "mongoose";

const theloaiSchema = new mongoose.Schema(
    {
        tieuDeTheLoai: {
            type: String,
        },
        idTruyen:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Truyen"
        },],
    },{ timestamps: true }
)

const Theloai = mongoose.model("Theloai", theloaiSchema, "Theloai");

export default Theloai;