import mongoose from "mongoose";

const giaodichSchema = new mongoose.Schema(
	{
		soLuongGD: {
			type: Number,
            required: true,
		},
		noiDungGD: {
			type: String,
            required: true,
		},
		nguoiDungIdGD: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "Nguoidung",
		},
	},
	{ timestamps: true }
);

const Giaodich = mongoose.model("Giaodich", giaodichSchema);

export default Giaodich;