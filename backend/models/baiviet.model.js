import mongoose from "mongoose";

const baivietSchema = new mongoose.Schema(
    {
        noiDungBV: {
            type: String,
        },
        binhLuanBV: [
            {
                text: {
                    type: String,
                    required: true,
                },
                nguoidung: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Nguoidung",
                    required: true,
                },
            },
        ],
        hinhAnhBV:{
            type:String,
        },
        luotThichBV:{
            type:Number,
        },
        thuocCD:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Congdong",
        },
        nguoiDungIdBV:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Nguoidung",
        }
    },
    { timestamps: true } 
);

const Baiviet = mongoose.model("Baiviet", baivietSchema);

export default Baiviet;
