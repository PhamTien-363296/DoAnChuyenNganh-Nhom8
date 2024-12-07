import mongoose from "mongoose";

const nguoidungSchema = new mongoose.Schema(
    {
        username: {
			type: String,
            required: true,
            unique: true,
		},
        email: {
			type: String,
            required: true,
            unique: true,
		},
        matKhau: {
			type: String,
            required: true,
            minLength: 6,
		},
        anhDaiDienND: {
			type: String,
		},
        moTaND: {
			type: String,
		},
        xuTongND: {
			type: Number,
		},
        xuConLaiND: {
			type: Number,
		},
        roleND: {
			type: Boolean,
		},
        theoDoiND: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Nguoidung",
				default: [],
			},
		],
        nguoiTheoDoiND: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Nguoidung",
				default: [],
			},
		],
        cacBaiVietND: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Baiviet",
				default: [],
			},
		],
        lichSuND: [
			{
				truyenId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Truyen",
                },
				chuongId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Chuong",
                },
				lastRead: {
					type: Date,
				},
			}
		],
        yeuThichND: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Truyen",
				default: [],
			},
		],
    }
)

const Nguoidung = mongoose.model("Nguoidung", nguoidungSchema,"Nguoidung");

export default Nguoidung;