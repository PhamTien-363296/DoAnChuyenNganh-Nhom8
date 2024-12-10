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
			default: 0,
		},
        xuConLaiND: {
			type: Number,
			default: 0,
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
				danhSachChuong: [
					{
						chuongId: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "Chuong",
						},
						thoiGianDocChuong:{ type: Date }
					}
				],
				thoiGianDoc: {
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
<<<<<<< HEAD
    },{ timestamps: true }
=======
		diemDanh: {
			type: Date,
			default: null, 
		},
    }
>>>>>>> a7c24f22e2db6c7d85438ec1d53b22f6493a9c33
)

const Nguoidung = mongoose.model("Nguoidung", nguoidungSchema,"Nguoidung");

export default Nguoidung;