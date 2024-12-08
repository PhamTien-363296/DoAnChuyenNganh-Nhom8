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
  },
  { timestamps: true }
);

const Truyen = mongoose.model("Truyen", truyenSchema, "Truyen");

export default Truyen;