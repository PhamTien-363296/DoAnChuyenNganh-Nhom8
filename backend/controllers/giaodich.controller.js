import Giaodich from "../models/giaodich.model.js"
import Nguoidung from "../models/nguoidung.model.js"
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const napXu = async (req, res) => {
    const idNguoiDung = req.nguoidung._id;
    const { soLuongXuGD, noiDungGD, dongTien, loaiGiaoDich } = req.body;
    try {
        if (!soLuongXuGD || !noiDungGD || !dongTien || !loaiGiaoDich) {
            return res.status(400).json({ error: "Thông tin giao dịch không đầy đủ." });
        }

        const thongTinGiaoDichMoi = {
            trangThaiThanhToan: "Chưa thanh toán",
            createdAt: new Date(),
        };

        const giaoDichMoi = new Giaodich({
            soLuongXuGD,
            dongTien,
            noiDungGD,
            loaiGiaoDich,
            nguoiDungIdGD: idNguoiDung,
            thongTinGiaoDich: thongTinGiaoDichMoi,
        });

        await giaoDichMoi.save();

        res.status(201).json({
            message: "Giao dịch thành công.",
            giaoDich: giaoDichMoi,
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.error("Các bài viết", error);
    }
};

export const capNhatNapXu = async (req, res) => {
    const idGiaoDich = req.params.id;
    const { maGiaoDich, trangThaiThanhToan, loaiThanhToan, loaiThe, loaiGiaoDich, amount } = req.body;
    try {
        if (!maGiaoDich || !trangThaiThanhToan || !loaiThanhToan || !loaiThe || !loaiGiaoDich || !amount) {
            return res.status(400).json({ error: 'Thông tin giao dịch không đầy đủ.' });
        }

        const giaodich = await Giaodich.findOne({ _id: new ObjectId(idGiaoDich) });
        if (!giaodich) {
            return res.status(404).json({ error: 'Giao dịch không tìm thấy.' });
        }

        giaodich.thongTinGiaoDich.maGiaoDich = maGiaoDich;
        giaodich.thongTinGiaoDich.trangThaiThanhToan = trangThaiThanhToan;
        giaodich.thongTinGiaoDich.loaiThanhToan = loaiThanhToan;
        giaodich.thongTinGiaoDich.loaiThe = loaiThe;
        giaodich.thongTinGiaoDich.loaiGiaoDich = loaiGiaoDich;
        giaodich.thongTinGiaoDich.amount = amount;
        giaodich.thongTinGiaoDich.createdAt = new Date(); 

        await giaodich.save();

        res.status(200).json({
            success: true,
            message: 'Cập nhật giao dịch thành công.',
            giaodich,
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật giao dịch của đơn hàng:", error.message);
        res.status(500).json({
            success: false,
            message: "Có lỗi xảy ra khi cập nhật giao dịch.",
            error: error.message,
        });
    }
};

export const layGiaoDichThongBao = async (req, res) => {
    const idGiaoDich = req.params.id;
    try {

        const giaodich = await Giaodich.findOne({ _id: new ObjectId(idGiaoDich) });
        if (!giaodich) {
            return res.status(404).json({ error: 'Đơn hàng không tìm thấy.' });
        }

        res.status(200).json(giaodich);
    } catch (error) {
        console.error("Lỗi khi lấy giao dịch của đơn hàng:", error.message);

        return res.status(500).json({
            success: false,
            message: "Có lỗi xảy ra khi lấy giao dịch.",
            error: error.message,
        });
    }
};

export const layGiaoDichCuaNguoiDung = async (req, res) => {
    const idNguoiDung = req.nguoidung._id;
    try {

        const giaodich = await Giaodich.find({ nguoiDungIdGD: idNguoiDung }).sort({ createdAt: -1 });
        if (!giaodich) {
            return res.status(404).json({ error: 'Đơn hàng không tìm thấy.' });
        }

        res.status(200).json(giaodich);
    } catch (error) {
        console.error("Lỗi khi lấy giao dịch của đơn hàng:", error.message);

        return res.status(500).json({
            success: false,
            message: "Có lỗi xảy ra khi lấy giao dịch.",
            error: error.message,
        });
    }
};
