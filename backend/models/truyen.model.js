import mongoose from "mongoose";

const truyenSchema = new mongoose.Schema(
  {
    tenTruyen: {
      type: String,
    },
    moTaTruyen: {
      type: String,
    },
    anhTruyen: {
      type: String,
    },
    luotXemTruyen: {
      type: Number,
      default: 0,
    },
    luotThichTruyen: {
      type: Number,
    },
    tinhTrangTruyen: {
      type: String,
      default: "Đang viết",  
    },
    trangThaiTruyen: {
      type: String,
      default: "Riêng tư",  
    },
    tacGiaIdTruyen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nguoidung",
      required: true,
    },
    theLoaiIdTruyen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theloai",
    },
    idCacChuong:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chuong"
    },],
    danhGia: {
      tongSao: {
        type: Number,
        default: 0,
        min: 0,
      },
      tongDanhGia: {
        type: Number,
        default: 0,
        min: 0,
      },
      trungBinhSao: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
    },
  },
  { timestamps: true }
);

const Truyen = mongoose.model("Truyen", truyenSchema, "Truyen");

export default Truyen;