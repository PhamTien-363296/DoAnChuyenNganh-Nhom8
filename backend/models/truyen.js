import mongoose from "mongoose";

const truyenSchema = new mongoose.Schema(
    {
        tenTruyen: {
            type: String,
        },
        moTaTruyen: {
            type:String,
        },
        anhTruyen: {
            type:String,
        },
        luotXemTruyen: {
            type:Number,
        },
        luotThichTruyen: {
            type:Number,
        },
        tinhTrangTruyen: {
            type:String,
        },
        trangThaiTruyen: {
            type: String,
        },
        tacGiaIdTruyen: {
            type: mongoose.Schema.Types.ObjectId,
			ref: "Nguoidung",
			required: true,
        }
    },{ timestamps: true }
)

const Truyen = mongoose.model("Truyen", truyenSchema);

export default Truyen;