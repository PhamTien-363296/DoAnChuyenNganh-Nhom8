import mongoose from "mongoose";

const danhgiaSchema = new mongoose.Schema(
	{
		soSaoDG: {
			type: Number,
            required: true,
		},
		noiDungDG: {
			type: String,
            required: true,
		},
		nguoiDungIdDG: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "Nguoidung",
		},
		truyenIdDG: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "Truyen",
		},
	},
	{ timestamps: true }
);

const Danhgia = mongoose.model("Danhgia", danhgiaSchema, "Danhgia");

export default Danhgia;