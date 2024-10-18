import mongoose from "mongoose";

const theloaiSchema = new mongoose.Schema(
    {
        loaiBC: {
            type: String,
        },
        cauhoiBC: {
            type:String,
        },
        trangThaiBC: {
            type:String,
        },
        phanHoiBC: {
            type:String,
        },
        lyDoTuChoiBC: {
            type:String,
        },
        nguoiDungIdBC: {
            type:String,
        }
    },{ timestamps: true }
)

const Theloai = mongoose.model("Theloai", theloaiSchema);

export default Theloai;