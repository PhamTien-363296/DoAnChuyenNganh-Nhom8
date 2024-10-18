import mongoose from "mongoose";

const thongbaoSchema = new mongoose.Schema(
	{
        noiDungTB: {
			type: String,
            required: true,
		},
        trangThaiTB: {
			type: Boolean,
            required: true,
		},
        nguoiDungIdTB: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "Nguoidung",
		},
	},
	{ timestamps: true }
);

const Thongbao = mongoose.model("Thongbao", thongbaoSchema);

export default Thongbao;