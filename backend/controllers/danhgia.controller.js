import Danhgia from "../models/danhgia.model.js";

export const kiemTraDanhGia = async (req, res) => {
    const { truyenId } = req.params;
    const idND = req.nguoidung._id;
    try {
        const existingRating = await Danhgia.findOne({  truyenIdDG: truyenId, nguoiDungIdDG: idND  });
        if (existingRating) {
            return res.status(200).json({ hasRated: true });
        }
        res.status(200).json({ hasRated: false });
    } catch (error) {
        res.status(500).json({ error: "Lỗi server!" });
        console.error("Error in kiemTraDanhGia controller", error);
    }
};

export const themDanhGia = async (req, res) => {
    const { truyenIdDG, soSaoDG, noiDungDG } = req.body;
    const idND = req.nguoidung._id;
    try {
        const newRating = new Danhgia({
            soSaoDG,
            noiDungDG,
            nguoiDungIdDG: idND, 
            truyenIdDG,
        });
        await newRating.save();
        res.status(201).json({ message: "Đánh giá của bạn đã được gửi thành công!" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi server!" });
        console.error("Error in themDanhGia controller", error);
    }
};


export const layDanhGia = async (req, res) => {
    const { truyenId } = req.params;
    try {
        const ratings = await Danhgia.find({ truyenIdDG: truyenId })
            .populate("nguoiDungIdDG", "username anhDaiDienND")
            .sort({ createdAt: -1 });

        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: "Lỗi server!" });
        console.error("Error in layDanhGia controller", error);
    }
};