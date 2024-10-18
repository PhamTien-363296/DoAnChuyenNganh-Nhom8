import mongoose from "mongoose";

const congdongSchema = new mongoose.Schema(
    {
        tenCD:{
            type: String,
        },
        moTaCD:{
            type:String,
        },
        thanhVienCD:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Nguoidung",
        },
        nguoiDungIdCD:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Nguoidung",
        }
    },{ timestamps: true }
)

const Congdong = mongoose.model("Congdong", congdongSchema);

export default Congdong;