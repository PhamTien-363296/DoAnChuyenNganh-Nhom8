import mongoose from "mongoose";

const chuongSchema = new mongoose.Schema(
	{
        tenChuong: {
			type: String,
            required: true,
		},
        noiDungChuong: {
			type: String,
		},
        soThuTuChuong: {
			type: Number,
		},
        luotThichChuong: {
			type: Number,
		},
        anhHienChuong: {
			type: String,
		},
        nguoiDungDaMoChuong: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Nguoidung",
            },
        ],
        binhLuanChuong: [
            {
                noiDungBinhLuanChuong: {
                    type: String,
                    required: true,
                },
                nguoiDungIdChuong: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Nguoidung",
                    required: true,
                },
                ngayBinhLuan: {
					type: Date,
                    default: Date.now, 
				},
            },
        ],
        truyenIdChuong: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Truyen",
            required: true,
        },
        trangThaiChuong: {
			type: String,
            default: "Riêng tư",  
		},
	},
	{ timestamps: true }
);

const Chuong = mongoose.model("Chuong", chuongSchema, "Chuong");

export default Chuong;
