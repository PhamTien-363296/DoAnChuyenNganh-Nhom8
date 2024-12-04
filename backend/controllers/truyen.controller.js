import Truyen from "../models/truyen.model.js";
import {v2 as cloudinary} from 'cloudinary'
import Nguoidung from "../models/nguoidung.model.js";
import Theloai from "../models/theloai.model.js";

export const layTatcaTruyen = async (req, res) => {
    try {
        const truyen = await Truyen.find({ trangThaiTruyen: "Công khai" });
        res.status(200).json(truyen);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTatcaTruyen controller", error);
    }
};

export const layTruyenTheoTheloai = async (req, res) => {
    const { id } = req.params;
    try {
        const truyen = await Truyen.find({ theLoaiIdTruyen: id, trangThaiTruyen: "Công khai" });
        res.status(200).json(truyen);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTruyenTheoTheloai controller", error);
    }
};


export const layTruyenTheoNguoidung = async (req, res) => {
    try {
        const tacGiaIdTruyen = req.nguoidung._id.toString();

        const nguoidung = await Nguoidung.findById(tacGiaIdTruyen);
        if (!nguoidung) return res.status(404).json({ message: "Không tìm thấy người dùng" });

        const truyen = await Truyen.find({ tacGiaIdTruyen: tacGiaIdTruyen });
        if (!truyen) {
            return res.status(404).json({ message: "Không tìm thấy truyện của người dùng" });
        }

        res.status(200).json(truyen);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTruyenTheoNguoidung controller", error);
    }
};

export const layTheoId = async (req, res) => {
    const { id } = req.params;
    try {
        const truyen = await Truyen.findById(id).populate("tacGiaIdTruyen").populate("theLoaiIdTruyen");
        res.status(200).json(truyen);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layTheoId controller", error);
    }
};

export const themTruyen = async (req, res) => {
    try {
        const { tenTruyen, moTaTruyen, anhTruyen, theLoaiIdTruyen } = req.body;
        const tacGiaIdTruyen = req.nguoidung._id.toString();

        const nguoidung = await Nguoidung.findById(tacGiaIdTruyen);
        if (!nguoidung) return res.status(404).json({ message: "Không tìm thấy người dùng" });

        if (!tenTruyen ) {
            return res.status(400).json({ error: "Truyện cần có tên" });
        }

        let anhTruyenUrl = anhTruyen;
        if (anhTruyen) {
            const uploadResult = await cloudinary.uploader.upload(anhTruyen);
            anhTruyenUrl = uploadResult.secure_url;
        }

        const truyenMoi = new Truyen({
            tenTruyen,
            moTaTruyen,
            anhTruyen: anhTruyenUrl,
            theLoaiIdTruyen,
            tacGiaIdTruyen,
        });

        const theLoai = await Theloai.findById(theLoaiIdTruyen);
        if (!theLoai) {
            console.log("Không tìm thấy thể loại với ID:", theLoaiIdTruyen);
            return res.status(404).json({ message: "Không tìm thấy thể loại" });
        }

        theLoai.idTruyen.push(truyenMoi._id); 
        await theLoai.save();

        await truyenMoi.save();
        res.status(201).json(truyenMoi);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log("Error in themTruyen controller", error);
    }
};

export const suaTruyen = async (req, res) => {
    const { tenTruyen, moTaTruyen, anhTruyen, theLoaiIdTruyen, tinhTrangTruyen, trangThaiTruyen } = req.body;

    try {
        let truyen = await Truyen.findById(req.params.id);

        if (!truyen) return res.status(404).json({ message: "Không tìm thấy truyện" });

        if (tenTruyen) truyen.tenTruyen = tenTruyen;
        if (moTaTruyen) truyen.moTaTruyen = moTaTruyen;
        if (anhTruyen) truyen.anhTruyen = anhTruyen;
        if (tinhTrangTruyen) truyen.tinhTrangTruyen = tinhTrangTruyen;
        if (trangThaiTruyen) truyen.trangThaiTruyen = trangThaiTruyen;

        const theLoaiIdTruyenCu = truyen.theLoaiIdTruyen;

        if (theLoaiIdTruyen && theLoaiIdTruyen !== theLoaiIdTruyenCu) {
            const theLoaiCu = await Theloai.findById(theLoaiIdTruyenCu);
            const theLoaiMoi = await Theloai.findById(theLoaiIdTruyen);

            if (!theLoaiMoi) {
                return res.status(404).json({ message: "Không tìm thấy thể loại này" });
            }

            if (theLoaiCu) {
                theLoaiCu.idTruyen.pull(truyen._id); 
                await theLoaiCu.save(); 
            }

            truyen.theLoaiIdTruyen = theLoaiMoi._id; 
            theLoaiMoi.idTruyen.push(truyen._id);

            await theLoaiMoi.save();
        }

        truyen = await truyen.save();

        return res.status(200).json({ truyen });
    } catch (error) {
        console.log("Lỗi suaTruyen controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const xoaTruyen = async (req, res) => {
    try {
        const truyen = await Truyen.findById(req.params.id);
        if (!truyen) {
            return res.status(404).json({ error: "Không tìm thấy truyện" });
        }

        await Truyen.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Xóa truyện thành công" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi xoaTruyen controller", error.message);
    }
};

export const capNhatLuotXem = async (req, res) => {
    const { id } = req.params; 
    try {   
        const truyen = await Truyen.findById(id);
        if (truyen) {
            truyen.luotXemTruyen += 1;
            await truyen.save();
        } else {
            console.log('Truyện không tồn tại');
        }
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi cập nhật lượt xem truyện controller", error.message);
    }
};

export const layTruyenTrangChu = async (req, res) => {
    const { sort = "phobien", limit = 6 } = req.query;
    try {
        let sortQuery;
        switch (sort) {
            case 'phobien':
                sortQuery = { luotXemTruyen: -1 }; // Sắp xếp theo lượt xem (giảm dần)
                break;
            case 'moinhat':
                sortQuery = { createdAt: -1 }; // Sắp xếp theo ngày tạo (mới nhất)
                break;
            case 'nhieunguoidat':
                sortQuery = { soLuongDonHang: -1 }; // Sắp xếp theo số lượng đơn hàng (giảm dần)
                break;
            case 'giatang':
                sortQuery = { 'phanLoai.coban.giaLoai': 1 }; // Sắp xếp theo giá (tăng dần)
                break;
            case 'giagiam':
                sortQuery = { 'phanLoai.coban.giaLoai': -1 }; // Sắp xếp theo giá (tăng dần)
                break;
        }

        const truyen = await Truyen.find({ trangThaiTruyen: "Công khai" })
        .populate("tacGiaIdTruyen")
        .sort(sortQuery)
        .limit(limit);

        if (truyen.length === 0) {
            return res.status(404).json({ message: 'Không có Truyện công khai' });
        }

        return res.status(200).json({truyen});
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi lấy truyện trang chủ controller", error.message);
    }
};
