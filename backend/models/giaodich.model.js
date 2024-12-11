import mongoose from "mongoose";
import { capNhatXu } from "../middleware/giaodich.middleware.js";

const giaodichSchema = new mongoose.Schema(
	{
		soLuongXuGD: {
			type: Number,
		},
		dongTien: {
			type: String,
		},
		noiDungGD: {
			type: String,
		},
		loaiGiaoDich: {
			type: String,
			enum: ["NapXu", "MuaChuong", "HoaHong", "DiemDanh"],
		},
		nguoiDungIdGD: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "Nguoidung",
		},
		thongTinGiaoDich: {
			maGiaoDich: { type: Number, required: false },
			trangThaiThanhToan: { type: String, required: false },
			loaiThanhToan: { type: String, required: false },
			loaiThe: { type: String, required: false },
			loaiGiaoDich: { type: String, required: false },
			amount: { type: Number, required: false },
			createdAt: { type: Date, required: false },
		},
	},
	{ timestamps: true }
);

giaodichSchema.pre('save', capNhatXu);

const Giaodich = mongoose.model("Giaodich", giaodichSchema, "Giaodich");

export default Giaodich;