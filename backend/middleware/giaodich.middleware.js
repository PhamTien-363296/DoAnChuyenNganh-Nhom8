import Nguoidung from "../models/nguoidung.model.js";

export const updateXuWhenSavingGiaoDich = async function (next) {
    const giaoDich = this;

    if (giaoDich.loaiGiaoDich === "NapXu" && giaoDich.thongTinGiaoDich && giaoDich.thongTinGiaoDich.trangThaiThanhToan !== "Thành công") {
        return next();
    }

    try {
        const nguoiDung = await Nguoidung.findById(giaoDich.nguoiDungIdGD);
        if (!nguoiDung) {
            return next(new Error("Người dùng không tồn tại."));
        }

        const soLuongXuGD = parseInt(giaoDich.soLuongXuGD, 10);
        if (isNaN(soLuongXuGD) || soLuongXuGD <= 0) {
            return next(new Error("Số lượng xu không hợp lệ."));
        }

        if (giaoDich.dongTien === "Cộng") {
            nguoiDung.xuConLaiND += soLuongXuGD;
            nguoiDung.xuTongND += soLuongXuGD;
        } else if (giaoDich.dongTien === "Trừ") {
            if (nguoiDung.xuConLaiND < soLuongXuGD) {
                return next(new Error("Số dư xu không đủ để thực hiện giao dịch."));
            }
            nguoiDung.xuConLaiND -= soLuongXuGD;
        } else {
            return next(new Error("Loại giao dịch không hợp lệ."));
        }

        await nguoiDung.save();
        next();
    } catch (error) {
        next(error);
    }
};
